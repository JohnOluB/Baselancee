import Link from "next/link";
import { Twitter, Linkedin, Instagram, Youtube, Facebook } from "lucide-react";
import DiscordIcon from "../icons/discord";
import Logo from "../logo";

const footerSections = [
  {
    title: "For Clients",
    links: [
      { href: "#", label: "How to Hire" },
      { href: "#", label: "Talent Marketplace" },
      { href: "#", label: "Project Catalog" },
      { href: "#", label: "Hire an Agency" },
      { href: "#", label: "Enterprise" },
      { href: "#", label: "Any Hire" },
      { href: "#", label: "Contract-to-Hire" },
      { href: "#", label: "Direct Contracts" },
      { href: "#", label: "Hire Worldwide" },
    ],
  },
  {
    title: "For Talent",
    links: [
      { href: "#", label: "How to Find Work" },
      { href: "#", label: "Direct Contracts" },
      { href: "#", label: "Find Freelance Jobs Worldwide" },
      { href: "#", label: "Find Freelance Jobs in the USA" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "Help & Support" },
      { href: "#", label: "Success Stories" },
      { href: "#", label: "Reviews" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Affiliate Program" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Leadership" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Our Impact" },
      { href: "#", label: "Press" },
      { href: "#", label: "Contact Us" },
      { href: "#", label: "Trust, Safety & Security" },
    ],
  },
];

const socialLinks = [
  { href: "#", icon: Facebook },
  { href: "#", icon: Linkedin },
  { href: "#", icon: Twitter },
  { href: "#", icon: Youtube },
  { href: "#", icon: Instagram },
  { href: "#", icon: DiscordIcon },
];

const legalLinks = [
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "CA Notice at Collection" },
    { href: "#", label: "Accessibility" },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
                <div key={section.title}>
                    <h3 className="font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                        {section.links.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="text-muted-foreground hover:text-white transition-colors text-sm">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
      <div className="container mx-auto px-4 border-t border-muted/20">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
                 <p>&copy; {new Date().getFullYear()} BaseLance. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                 {legalLinks.map(({ href, label }) => (
                    <Link key={label} href={href} className="hover:text-white transition-colors">
                        {label}
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-4">
                 <p>Follow Us</p>
                {socialLinks.map(({ href, icon: Icon }, index) => (
                <Link key={index} href={href} className="text-muted-foreground hover:text-white">
                    <Icon className="h-5 w-5" />
                </Link>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}