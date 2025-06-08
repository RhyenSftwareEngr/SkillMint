import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CreateEventModal({ open, onClose }) {
  const { actor } = useAuth();
  // Form state
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("onsite");
  const [virtualLink, setVirtualLink] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [tags, setTags] = useState("");
  const [details, setDetails] = useState("");
  const [sameDay, setSameDay] = useState(false);
  const [wholeDay, setWholeDay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [bldg, setBldg] = useState("");
  const [street, setStreet] = useState("");
  const [brgy, setBrgy] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [badge, setBadge] = useState("");
  const [certificate, setCertificate] = useState("");
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const [badgeImageUrl, setBadgeImageUrl] = useState("");

  // If user unchecks "Ends on the same day?", disable and uncheck "Whole day"
  const handleSameDayChange = () => {
    setSameDay((prev) => {
      if (!prev) setWholeDay(false); // Reset wholeDay if unchecking
      return !prev;
    });
  };

  // Helper: convert date and time to IC time (nanoseconds since epoch)
  function toICTime(date, time) {
    if (!date) return 0;
    const d = new Date(date + (time ? `T${time}` : "T00:00"));
    return BigInt(d.getTime()) * 1000000n;
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      // Build payload matching Types.EventProfile
      const payload = {
        event_name: eventName,
        event_description: description,
        event_date: toICTime(startDate, startTime),
        event_end_date: toICTime(endDate, endTime),
        event_mode:
          location === "onsite"
            ? { Physical: null }
            : location === "virtual"
              ? { Virtual: null }
              : { Hybrid: null },
        event_location:
          location === "onsite" || location === "hybrid"
            ? [{
              establishment: establishment ? [establishment] : [],
              bldg: bldg ? [bldg] : [],
              street: street ? [street] : [],
              brgy: brgy ? [brgy] : [],
              zipcode: zipcode ? [zipcode] : [],
              city: city || "",
              country: country || ""
            }]
            : [],
        virtual_link: virtualLink ? [virtualLink] : [],
        registration_start: toICTime(startDate, startTime),
        registration_end: endDate ? toICTime(endDate, endTime) : toICTime(startDate, endTime),
        max_attendees: maxAttendees ? [parseInt(maxAttendees)] : [],
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        requirements: [],
        image_url: [],
        event_detail: details,
        badge: {
          name: badgeName,
          description: badgeDescription,
          image_url: badgeImageUrl ? [badgeImageUrl] : [],
        },
      };
      // Call backend
      const eventId = await actor.submitEvent(payload);
      setSuccess("Event created! ID: " + eventId);
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 overflow-auto">
      <div
        className="
  bg-white rounded-xl shadow-2xl w-full
  max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
  p-4 sm:p-8 mx-2 relative animate-fadeIn
  max-h-[90vh] overflow-y-auto
"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-2xl">Create Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Show error/success */}
          {error && <div className="mb-2 text-red-600">{error}</div>}
          {success && <div className="mb-2 text-green-600">{success}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              {/* Event Name */}
              <div className="mb-3">
                <label className="block font-medium mb-1 text-sm">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                  placeholder="Enter event name"
                  maxLength={100}
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              {/* Upload Photos / Videos */}
              <div className="mb-3">
                <label className="block font-medium mb-1 text-sm">
                  Upload Photos / Videos
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      type="button"
                      className="w-16 h-16 border-2 border-dashed border-blue-300 flex items-center justify-center rounded-lg bg-blue-50 text-3xl text-blue-400 focus:outline-none"
                    >
                      +
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-1 text-xs text-blue-500 hover:underline"
                >
                  + Add more
                </button>
              </div>
              {/* Add Description */}
              <div className="mb-3">
                <label className="block font-medium mb-1 text-sm">
                  Add Description
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                  placeholder="Enter Description"
                  rows={2}
                  maxLength={1000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="text-xs text-gray-400 text-right mt-1">
                  {description.length}/1000
                </div>
              </div>
              {/* Date and Time */}
              <div className="mb-3 space-y-4">
                {/* --- DATE FIELDS --- */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-medium mb-1 text-sm">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded px-3 py-2 bg-gray-50"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  {!sameDay && (
                    <div className="flex-1">
                      <label className="block font-medium mb-1 text-sm">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        className="w-full border rounded px-3 py-2 bg-gray-50"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </div>
                {/* Checkbox for Same Day */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="same-day"
                    checked={sameDay}
                    onChange={handleSameDayChange}
                  />
                  <label htmlFor="same-day" className="text-xs text-gray-600">
                    Ends on the same day?
                  </label>
                </div>

                {/* --- TIME FIELDS --- */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-medium mb-1 text-sm">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      className="w-full border rounded px-3 py-2 bg-gray-50"
                      disabled={wholeDay}
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required={!wholeDay}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-medium mb-1 text-sm">
                      End Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      className="w-full border rounded px-3 py-2 bg-gray-50"
                      disabled={wholeDay}
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required={!wholeDay}
                    />
                  </div>
                </div>
                {/* Checkbox for Whole Day */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="whole-day"
                    checked={wholeDay}
                    onChange={() => setWholeDay((prev) => !prev)}
                    disabled={!sameDay}
                  />
                  <label
                    htmlFor="whole-day"
                    className={`text-xs ${!sameDay ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Whole day?
                  </label>
                </div>
              </div>
              {/* Location & Max Attendees */}
              <div className="flex gap-2 mb-3">
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-sm">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3 mt-1">
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="radio"
                        name="location"
                        value="onsite"
                        checked={location === "onsite"}
                        onChange={() => setLocation("onsite")}
                      />{" "}
                      Onsite
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="radio"
                        name="location"
                        value="virtual"
                        checked={location === "virtual"}
                        onChange={() => setLocation("virtual")}
                      />{" "}
                      Virtual
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="radio"
                        name="location"
                        value="hybrid"
                        checked={location === "hybrid"}
                        onChange={() => setLocation("hybrid")}
                      />{" "}
                      Hybrid
                    </label>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-sm">
                    Max Attendees <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                    placeholder="e.g. 100"
                    value={maxAttendees}
                    onChange={(e) => setMaxAttendees(e.target.value)}
                    min={1}
                  />
                </div>
              </div>

              {/* Show fields based on selection */}
              {(location === "virtual" || location === "hybrid") && (
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Link
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter virtual link"
                    value={virtualLink}
                    onChange={(e) => setVirtualLink(e.target.value)}
                  />
                </div>
              )}

              {(location === "onsite" || location === "hybrid") && (
                <>
                  <div className="mb-3">
                    <label className="block font-medium mb-1 text-sm">
                      Establishment Name / House No. & Street <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                      placeholder="Enter establishment name / house no. & street"
                      value={establishment}
                      onChange={e => setEstablishment(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1 text-sm">
                      Building / Floor / Unit
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                      placeholder="Enter building / floor / unit number"
                      value={bldg}
                      onChange={e => setBldg(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1 text-sm">
                      Street
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                      placeholder="Enter street"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1 text-sm">
                      Barangay <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                      placeholder="Enter barangay"
                      value={brgy}
                      onChange={e => setBrgy(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-medium mb-1 text-sm">
                      Zipcode
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                      placeholder="Enter zipcode"
                      value={zipcode}
                      onChange={e => setZipcode(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1">
                      <label className="block font-medium mb-1 text-sm">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                        placeholder="Enter city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium mb-1 text-sm">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                        placeholder="Enter country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Badge Fields */}
              <div className="mb-3">
                <label className="block font-medium mb-1 text-sm">Badge Name <span className="text-red-500">*</span></label>
                <input
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                  placeholder="Enter badge name"
                  value={badgeName}
                  onChange={e => setBadgeName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1 text-sm">Badge Description <span className="text-red-500">*</span></label>
                <textarea
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                  placeholder="Enter badge description"
                  value={badgeDescription}
                  onChange={e => setBadgeDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1 text-sm">Badge Image URL</label>
                <input
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                  placeholder="Enter badge image URL (optional)"
                  value={badgeImageUrl}
                  onChange={e => setBadgeImageUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Tags */}
              <div className="space-y-4">
                <label className="block font-medium mb-1 text-sm">
                  Tags{" "}
                  <span className="text-gray-400 text-xs">
                    (Separate using comma.)
                  </span>
                </label>
                <input
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                  placeholder="Tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              {/* Details */}
              <div className="mb-3">
                <label className="block font-medium mb-1 text-sm">
                  Details
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-base"
                  rows={6}
                  placeholder="Enter event details"
                  maxLength={10000}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
                <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                  <span>
                    {/* Example rich text editor buttons */}
                    <button type="button" className="mx-1">
                      ↻
                    </button>
                    <button type="button" className="mx-1 font-bold">
                      B
                    </button>
                    <button type="button" className="mx-1 font-bold italic">
                      I
                    </button>
                    <button type="button" className="mx-1 underline">
                      U
                    </button>
                  </span>
                  <span>{details.length}/10000</span>
                </div>
              </div>
              {/* Attachment */}
              <div className="mb-3">
                <label className="block font-medium mb-1 text-sm">
                  Attachment
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-gray-700 text-white flex items-center gap-1 text-xs"
                  >
                    <span>📎</span> Attach a file
                  </button>
                  <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2 text-xs truncate">
                    Grow_A_Garden_Cheats.pdf (12.3 MB)
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700 text-base leading-none"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
              {/* Completion Reward and Token */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Completion reward type{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3 mt-1">
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="reward" value="certificate" checked={badge === "certificate"} onChange={() => setBadge("certificate")} /> Certificate
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name="reward" value="badge" checked={badge === "badge"} onChange={() => setBadge("badge")} /> Badge
                    </label>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-sm invisible">
                    Token
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="token-reward"
                      className="form-checkbox"
                    />
                    <label htmlFor="token-reward" className="text-sm">
                      Include token reward
                    </label>
                  </div>
                  <div className="text-xs text-gray-400 ml-6 mt-1">
                    Note: Ensure you have enough SMT tokens to cover all
                    selected attendees
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded bg-gray-100 text-gray-700 text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-blue-600 text-white text-base font-semibold shadow hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"} <span className="ml-1">✓</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
