<div align="center">
  <img src="./SkillMint.png" alt="SkillMint Logo" width="300"/>
</div>

<div align="center">

[![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react)](https://react.dev/) [![Motoko](https://img.shields.io/badge/Backend-Motoko-2D6DF6?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMkQ2REY2IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=)](https://internetcomputer.org/docs/current/motoko/main/motoko-intro/) [![ICP](https://img.shields.io/badge/Blockchain-ICP-29ABE2?logo=internet-computer)](https://internetcomputer.org/) [![Internet Identity](https://img.shields.io/badge/Auth-Internet%20Identity-FF9900?logo=internet-computer)](https://identity.ic0.app/) [![Canister Storage](https://img.shields.io/badge/Storage-Canister%20Storage-6E4AFF?logo=internet-computer)](https://internetcomputer.org/docs/current/developer-docs/integrations/storage/) [![GitHub](https://img.shields.io/badge/Dev%20Tools-GitHub-181717?logo=github)](https://github.com/) [![Figma](https://img.shields.io/badge/Design-Figma-F24E1E?logo=figma)](https://figma.com/) [![Excalidraw](https://img.shields.io/badge/Design-Excalidraw-1D1D1D?logo=excalidraw)](https://excalidraw.com/)

</div>

# **Empowering ICT Students through Decentralized Proof of Skills**

Socials: [Facebook](https://www.facebook.com/profile.php?id=61577693313846) and [Twitter](https://x.com/skillmintph/status/1936428982003773634)
Live Demo: [https://ns4pw-yyaaa-aaaam-aelaa-cai.icp0.io](https://ns4pw-yyaaa-aaaam-aelaa-cai.icp0.io)

SkillMint is a Web3 platform that enables college-level tech students to build verifiable skill portfolios, discover tech events, and earn blockchain-backed credentials and token rewards.

Especially those who are usually untapped just because they don't live in the city.

---

## Project Overview

We get people to not only participate, but also build.

✅ Hackathons

✅ Bootcamps

✅ Tech Seminars

✅ Workshops

✅ ...more 

students can earn NFT credentials and token rewards, showcasing their growth and skills in a trusted, transparent way. 

SkillMint also provides tools for event organizers to manage participation and issue verifiable badges, with plans to integrate into school systems for broader adoption. Powered by the Internet Computer Protocol (ICP), SkillMint ensures security, scalability, and accessibility for the next generation of tech talent.

---

```mermaid
flowchart TD
  A["Frontend: React.js"] -->|"API Calls"| B["Backend: Motoko (ICP Canister)"]
  B -->|"On-chain Storage"| C["ICP Native Canister Storage"]
  A -->|"Auth"| D["Internet Identity"]
  B -->|"Token/NFT Logic"| E["SMT Token (off-chain, ICRC planned)"]
  subgraph DevTools
    F["GitHub"]
    G["Figma"]
    H["Excalidraw/draw.io"]
  end
  F -.-> A
  G -.-> A
  H -.-> A
  style DevTools fill:#f9f,stroke:#333,stroke-width:2px
  ```
---

## Problems

- Lack of credible proof for extracurricular learning
- Limited access to national-level events for students in provinces
- Scattered or fake digital credentials
- Low motivation for students to join events without clear benefits

---

## Solution 

- **Student Portfolios** secured by blockchain (ICP)
- **Event Discovery** and application system
- **Organizer Tools** for event creation, verification, and token allocation
- **Future Integration** with school systems (e.g., LMS, registrar offices)

---

## Target Users

- **Primary**: ICT-related college students in the Philippines (especially outside Metro Manila)
- **Secondary**: Student orgs, tech companies, academic institutions hosting events

---

## Roadmap

| Phase | Milestone                                      | Timeline |
|-------|------------------------------------------------|----------|
| 1     | MVP (profile + events + basic verification)    | June 2025|
| 2     | Token reward system + school onboarding        | Q3 2025  |
| 3     | University pilot + school system integrations  | Q4 2025  |

---

## 🧠 Key Features

- 🎓 Blockchain-secured student profiles
- 🛠 Portfolio builder (GitHub links, NFT badges, certificates)
- 📅 Event discovery and application
- 🏆 Token rewards for participation and wins
- 🧑‍🏫 Organizer dashboards for verification and management
- 🔐 Internet Identity-based login (no wallets needed at MVP)

---

## 🪙 Token System (SMT - SkillMint Token)

| Activity                  | Reward      |
|---------------------------|-------------|
| Event Attendance          | +10 SMT     |
| Event Completion          | +20 SMT     |
| Competition Win (1st–3rd) | +50–100 SMT |
| Peer Feedback             | +5 SMT      |
| Referral/Invites          | +10 SMT     |


## 👨‍👩‍👧‍👦 The Team

- **Marlon Vincent G. Laurenciana** – Project Manager  
- **Rhyen Jan O. Natividad** – Tech Lead  
- **Loyd Martin B. Vendiola** – Backend Developer  
- **Simonee Ezekiel Mariquit** – Frontend Developer  
- **Angela N. Tallon** – Designer

---

## 🪄 Call to Action

We're looking for:
- 🎓 School partners for pilot integrations
- 🏢 Event organizers and tech sponsors
- 💡 Mentors, developers, and community supporters

Reach out via semariquit@gmail.com.

## Running the project locally

Use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
