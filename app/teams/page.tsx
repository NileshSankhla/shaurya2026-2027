"use client";

import { useState } from "react";
import Navbar from "../Navbar";
import styles from "./teams.module.css";

type TeamMember = {
  name: string;
  phone: string;
  image: string;
};

type Department = {
  name: string;
  members: TeamMember[];
};

type ContactLink = {
  label: string;
  href: string;
};

const imageBase = "https://www.shauryaiitkgp.in/images/teams/";

const departments: Department[] = [
  {
    name: "Executive Heads",
    members: [
      { name: "Sidharth Reddy", phone: "8639775835", image: `${imageBase}Sidharth Reddy.PNG` },
      { name: "Mayank Singh", phone: "8814943708", image: `${imageBase}Mayank Yadav.webp` },
      { name: "Jyoti", phone: "6367363093", image: `${imageBase}jyoti.jpg` },
    ],
  },
  {
    name: "Finance Heads",
    members: [
      { name: "Namanya Pant", phone: "9004487822", image: `${imageBase}Namanya Pant.jpg` },
      { name: "Saksham Aggarwal", phone: "7304368246", image: `${imageBase}Saksham Aggarwal.jpg` },
    ],
  },
  {
    name: "Event Heads",
    members: [
      { name: "Navadeep Nandedapu", phone: "8179575909", image: `${imageBase}Navadeep.jpg` },
      { name: "Yayavaram Vivekadithya", phone: "8328271915", image: `${imageBase}Vivek.jpg` },
      { name: "Surekha", phone: "6350603609", image: `${imageBase}surekha.jpg` },
      { name: "Sabita Kumari", phone: "7667578864", image: `${imageBase}sabita kumari.jpg` },
      { name: "Budida Abhinav", phone: "6300068771", image: `${imageBase}Budida Abhinav.jpg` },
      { name: "MS Karthik", phone: "9845916377", image: `${imageBase}MS Karthik.jpg` },
    ],
  },
  {
    name: "Publicity & Marketing Heads",
    members: [
      { name: "Rupali Hingankar", phone: "8830220583", image: `${imageBase}rupali.jpg` },
      { name: "Shivraj Gulve", phone: "8421115807", image: `${imageBase}Shivraj.png` },
      { name: "Vangala Akshay Reddy", phone: "8309403808", image: `${imageBase}Akshay.jpg` },
    ],
  },
  {
    name: "Sponsorship Heads",
    members: [
      { name: "Ayush Kumar", phone: "9304203012", image: `${imageBase}ayush.webp` },
      { name: "Akash Kolanti", phone: "9542309116", image: `${imageBase}Akash Kolanti.jpg` },
      { name: "Sauparna Das", phone: "9330578069", image: `${imageBase}sauparnadas.jpg` },
    ],
  },
  {
    name: "Web Heads",
    members: [
      { name: "Ananye Kachhap", phone: "9931319395", image: `${imageBase}Ananye Kachhap.jpg` },
      { name: "Jeet Anand", phone: "9122233011", image: `${imageBase}jeet.jpg` },
    ],
  },
  {
    name: "Media and Public Relations",
    members: [
      { name: "Rasamalla Charan Prakash", phone: "8309483130", image: `${imageBase}Rasamalla Charan Prakash.png` },
      { name: "Nudvip Tale", phone: "8142999166", image: `${imageBase}Nudvip Tale.jpg` },
      { name: "Annangi Neeraj Kumar", phone: "8328003149", image: `${imageBase}Annangi Neeraj Kumar.jpg` },
    ],
  },
];

const contactLinks: Record<string, ContactLink[]> = {
  "Sidharth Reddy": [
    { label: "WhatsApp", href: "https://wa.me/8639775835" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sidharth-reddy-552596336/" },
    { label: "Instagram", href: "https://www.instagram.com/sidharthreddy_32?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=sidharthreddy32@gmail.com" },
  ],
  "Mayank Singh": [
    { label: "WhatsApp", href: "https://wa.me/8814943708" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mayank-singh-8b9199303/" },
    { label: "Instagram", href: "https://www.instagram.com/mayanksingh_08?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=ms9421837@gmail.com" },
  ],
  Jyoti: [
    { label: "WhatsApp", href: "https://wa.me/6367363093" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jyoti-bhamboo-8955a5290/" },
    { label: "Instagram", href: "https://www.instagram.com/__jyoti_bhamboo__/?utm_source=ig_web_button_share_sheet" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=jyotibhamboo2518@gmail.com" },
  ],
  "Namanya Pant": [
    { label: "WhatsApp", href: "https://wa.me/9004487822" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/namanya-pant/" },
    { label: "Instagram", href: "https://www.instagram.com/namanya_1239/?utm_source=ig_web_button_share_sheet" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=namanyapant2630@gmail.com" },
  ],
  "Saksham Aggarwal": [
    { label: "WhatsApp", href: "https://wa.me/7304368246" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saksham-aggarwal-a35648293/" },
    { label: "Instagram", href: "https://www.instagram.com/sakshamm_1301/?utm_source=ig_web_button_share_sheet" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=sakshamaggarwal.shaurya.iitkgp@gmail.com" },
  ],
  "Navadeep Nandedapu": [
    { label: "WhatsApp", href: "https://wa.me/8179575909" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/navadeep-nandedapu-b7b592291/" },
    { label: "Instagram", href: "https://www.instagram.com/navadeep._.7241?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=navadeepnandedapu@gmail.com" },
  ],
  "Yayavaram Vivekadithya": [
    { label: "WhatsApp", href: "https://wa.me/8328271915" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vivekadithya-yayavaram-8002a2291/" },
    { label: "Instagram", href: "https://www.instagram.com/vivekadithya7/?utm_source=ig_web_button_share_sheet" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=vivekadithyayayavaram2005@gmail.com" },
  ],
  Surekha: [
    { label: "WhatsApp", href: "https://wa.me/6350603609" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/surekha-b055392ab/" },
    { label: "Instagram", href: "https://www.instagram.com/surekhabaindha/?utm_source=ig_web_button_share_sheet" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=surekha.shaurya.iitkgp@gmail.com" },
  ],
  "Sabita Kumari": [
    { label: "WhatsApp", href: "https://wa.me/7667578864" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sabita-marandi-75b06b28b/" },
    { label: "Instagram", href: "https://www.instagram.com/sabbimarandi/?utm_source=ig_web_button_share_sheet" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=sabita.shauryaiitkgp23@gmail.com" },
  ],
  "Budida Abhinav": [
    { label: "WhatsApp", href: "https://wa.me/6300068771" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abhinav-budida-8958492b5/" },
    { label: "Instagram", href: "https://www.instagram.com/abhinav._.7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=abhinavbudida.shaurya.iitkgp@gmail.com" },
  ],
  "MS Karthik": [
    { label: "WhatsApp", href: "https://wa.me/9845916377" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ms-karthik-a242b4291/" },
    { label: "Instagram", href: "https://www.instagram.com/ms.karthik_01/?utm_source=ig_web_button_share_sheet" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=mskarthik.shaurya.iitkgp@gmail.com" },
  ],
  "Rupali Hingankar": [
    { label: "WhatsApp", href: "https://wa.me/8830220583" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rupali-hingankar-7363ba288/" },
    { label: "Instagram", href: "https://www.instagram.com/hingankarrupali?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=rupalihingankar.shaurya.iitkgp@gmail.com" },
  ],
  "Shivraj Gulve": [
    { label: "WhatsApp", href: "https://wa.me/8421115807" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shivraj-gulve-6583952bb/" },
    { label: "Instagram", href: "https://www.instagram.com/_shiv.__07_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=shivrajgulve.shaurya.iitkgp@gmail.com" },
  ],
  "Vangala Akshay Reddy": [
    { label: "WhatsApp", href: "https://wa.me/8309403808" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vangalaakshayreddy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    { label: "Instagram", href: "https://www.instagram.com/vangala_akshay_reddy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=akshayreddy.shaurya.iitkgp@gmail.com" },
  ],
  "Ayush Kumar": [
    { label: "WhatsApp", href: "https://wa.me/9304203012" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-kumar-519a6328b/" },
    { label: "Instagram", href: "https://www.instagram.com/ayush018_kr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=ayushkr092004@gmail.com" },
  ],
  "Akash Kolanti": [
    { label: "WhatsApp", href: "https://wa.me/9542309116" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/akash-kolanti-0a063b281/" },
    { label: "Instagram", href: "https://www.instagram.com/akashk__21?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=akash.k2104@gmail.com" },
  ],
  "Sauparna Das": [
    { label: "WhatsApp", href: "https://wa.me/9330578069" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sauparnadas/" },
    { label: "Instagram", href: "https://www.instagram.com/dassauparna?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=sauparnadas@gmail.com" },
  ],
  "Ananye Kachhap": [
    { label: "WhatsApp", href: "https://wa.me/9931319395" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ananye-kachhap-513263288/" },
    { label: "Instagram", href: "https://www.instagram.com/sh_r_e_dd_e_r?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=ajitkachhap005@kgpian.iitkgp.ac.in" },
  ],
  "Jeet Anand": [
    { label: "WhatsApp", href: "https://wa.me/9122233011" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jeet-anand-950493284/" },
    { label: "Instagram", href: "https://www.instagram.com/jeetan.and?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=jeetaana123@gmail.com" },
  ],
  "Rasamalla Charan Prakash": [
    { label: "WhatsApp", href: "https://wa.me/8309483130" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rasamalla-charan-prakash-71256728a/" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=rasamallacharanprakash0@gmail.com" },
  ],
  "Nudvip Tale": [
    { label: "WhatsApp", href: "https://wa.me/8142999166" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nudvip-tale-a9904a312/" },
    { label: "Instagram", href: "https://www.instagram.com/nudvip_tale?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=nudviptale@gmail.com" },
  ],
  "Annangi Neeraj Kumar": [
    { label: "WhatsApp", href: "https://wa.me/8328003149" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/annangi-neeraj-kumar-4ab546259/" },
    { label: "Instagram", href: "https://www.instagram.com/neerajkumar_809?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=neerajannangi4@gmail.com" },
  ],
};

export default function TeamsPage() {
  const [activeDepartment, setActiveDepartment] = useState(departments[0].name);
  const activeTeam = departments.find((department) => department.name === activeDepartment) ?? departments[0];

  return (
    <main className={styles.page}>
      <Navbar
        links={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/#events" },
          { label: "Games", href: "/#games" },
          { label: "Sponsors", href: "/#sponsors" },
          { label: "Team", href: "/teams" },
        ]}
      />

      <div className={styles.pageTexture} aria-hidden="true" />
      <section className={styles.teamHero}>
        <p className={styles.kicker}>SHAURYA 2026</p>
        <h1>Our Team</h1>
        <p className={styles.heroCopy}>
          The minds, hands, and hearts behind the biggest sports festival at IIT Kharagpur.
        </p>
        <label className={styles.editionControl}>
          <span>Edition</span>
          <select aria-label="Team edition" defaultValue="2026">
            <option value="2026">2026</option>
          </select>
        </label>
      </section>

      <section className={styles.directory} aria-label="Team departments">
        <div className={styles.departmentNav} role="tablist" aria-label="Choose a department">
          {departments.map((department) => (
            <button
              key={department.name}
              type="button"
              role="tab"
              aria-selected={activeDepartment === department.name}
              className={`${styles.departmentButton} ${activeDepartment === department.name ? styles.departmentButtonActive : ""}`}
              onClick={() => setActiveDepartment(department.name)}
            >
              {department.name}
            </button>
          ))}
        </div>

        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>2026 / {String(activeTeam.members.length).padStart(2, "0")} MEMBERS</p>
            <h2>{activeTeam.name}</h2>
          </div>
          <p>Meet the people turning ambition into action.</p>
        </div>

        <div className={styles.memberGrid} role="tabpanel">
          {activeTeam.members.map((member, index) => (
            <article className={styles.memberCard} key={member.name}>
              <div className={styles.memberImageWrap}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.memberImage}
                />
                <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.memberInfo}>
                <p className={styles.memberDepartment}>{activeTeam.name}</p>
                <h3>{member.name}</h3>
                {member.phone && <p className={styles.phone}>{member.phone}</p>}
                <div className={styles.contactLinks}>
                  {(contactLinks[member.name] ?? []).map((link) => (
                    <a className={styles.contactLink} href={link.href} key={link.label} target="_blank" rel="noreferrer">
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Shaurya 2026</span>
        <span>IIT Kharagpur</span>
      </footer>
    </main>
  );
}
