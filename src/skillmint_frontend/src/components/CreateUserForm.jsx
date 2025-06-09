import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CreateUserForm({ onSuccess }) {
    const { actor, identity } = useAuth();
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        bio: "",
        skills: "",
        affiliation: "",
        profile_image: "",
        // Social links as array of { platform, url }
        social_links: [{ platform: "", url: "" }],
        // Location fields
        establishment: "",
        bldg: "",
        street: "",
        brgy: "",
        zipcode: "",
        city: "",
        country: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSocialLinkChange = (i, field, value) => {
        const updated = form.social_links.map((s, idx) =>
            idx === i ? { ...s, [field]: value } : s
        ); 
        setForm({ ...form, social_links: updated });
    };

    const addSocialLink = () => {
        setForm({ ...form, social_links: [...form.social_links, { platform: "", url: "" }] });
    };

    const removeSocialLink = (i) => {
        setForm({ ...form, social_links: form.social_links.filter((_, idx) => idx !== i) });
    };

    const hasLocation = () => {
        return (
            form.city.trim() && form.country.trim()
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const profile = {
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                phone: form.phone,
                bio: form.bio ? [form.bio] : [],
                skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
                social_links: form.social_links.filter(s => s.platform && s.url),
                profile_image: form.profile_image ? [form.profile_image] : [],
                affiliation: form.affiliation ? form.affiliation.split(",").map((a) => a.trim()).filter(Boolean) : [],
                location: hasLocation() ? [{
                    establishment: form.establishment ? [form.establishment] : [],
                    bldg: form.bldg ? [form.bldg] : [],
                    street: form.street ? [form.street] : [],
                    brgy: form.brgy ? [form.brgy] : [],
                    zipcode: form.zipcode ? [form.zipcode] : [],
                    city: form.city,
                    country: form.country,
                }] : [],
            };
            if (!identity || !identity.getPrincipal) {
                setError("User identity not found. Please log in again.");
                setLoading(false);
                return;
            }
            const principal = identity.getPrincipal();
            await actor.addUser(principal, profile);
            setSuccess("Profile created successfully!");
            if (onSuccess) onSuccess();
        } catch (err) {
            setError("Failed to create profile: " + (err.message || err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-8">
            {error && <div className="mb-2 text-red-600">{error}</div>}
            {success && <div className="mb-2 text-green-600">{success}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="first_name" value={form.first_name} onChange={handleChange} required placeholder="First Name" className="border p-2 rounded" />
                <input name="last_name" value={form.last_name} onChange={handleChange} required placeholder="Last Name" className="border p-2 rounded" />
                <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="border p-2 rounded" />
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" className="border p-2 rounded" />
                <input name="affiliation" value={form.affiliation} onChange={handleChange} placeholder="Affiliation (comma separated)" className="border p-2 rounded md:col-span-2" />
                <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="border p-2 rounded md:col-span-2" />
                <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short Bio" className="border p-2 rounded md:col-span-2" />
                <input name="profile_image" value={form.profile_image} onChange={handleChange} placeholder="Profile Image URL" className="border p-2 rounded md:col-span-2" />
            </div>
            <div className="mt-4 mb-2 font-semibold">Social Links</div>
            {form.social_links.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                    <input
                        type="text"
                        placeholder="Platform (e.g. Twitter)"
                        value={s.platform}
                        onChange={e => handleSocialLinkChange(i, "platform", e.target.value)}
                        className="border p-2 rounded flex-1"
                    />
                    <input
                        type="url"
                        placeholder="URL"
                        value={s.url}
                        onChange={e => handleSocialLinkChange(i, "url", e.target.value)}
                        className="border p-2 rounded flex-1"
                    />
                    <button type="button" onClick={() => removeSocialLink(i)} className="text-red-500 font-bold">×</button>
                </div>
            ))}
            <button type="button" onClick={addSocialLink} className="text-blue-700 underline mb-4">+ Add Social Link</button>
            <div className="mt-4 mb-2 font-semibold">Location</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <input name="establishment" value={form.establishment} onChange={handleChange} placeholder="Establishment" className="border p-2 rounded" />
                <input name="bldg" value={form.bldg} onChange={handleChange} placeholder="Building" className="border p-2 rounded" />
                <input name="street" value={form.street} onChange={handleChange} placeholder="Street" className="border p-2 rounded" />
                <input name="brgy" value={form.brgy} onChange={handleChange} placeholder="Barangay" className="border p-2 rounded" />
                <input name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="Zipcode" className="border p-2 rounded" />
                <input name="city" value={form.city} onChange={handleChange} placeholder="City (required)" className="border p-2 rounded" />
                <input name="country" value={form.country} onChange={handleChange} placeholder="Country (required)" className="border p-2 rounded" />
            </div>
            <button type="submit" className="mt-4 bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800" disabled={loading}>
                {loading ? "Creating..." : "Create Profile"}
            </button>
        </form>
    );
} 