import Link from "next/link";
import { Twitter, Linkedin, Instagram, Youtube, Facebook } from "lucide-react";
import DiscordIcon from "../icons/discord";
import Logo from "../logo";

const footerSections = [
  {
    title: "Platform",
    links: [
      { href: "#", label: "Find Work" },
      { href: "#", label: "Find Talent" },
      { href: "#", label: "Categories" },
      { href: "#", label: "About Us" },
    ],
  },
  {
    title: "Categories",
    links: [
      { href: "#", label: "Data Science" },
      { href: "#", label: "IT & Networking" },
      { href: "#", label: "Web & Mobile" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "#", label: "FAQ's" },
      { href: "#", label: "Contact Us" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { href: "#", label: "Instagram" },
      { href: "#", label: "LinkedIn" },
      { href: "#", label: "Twitter" },
    ],
  },
];


const socialLinks = [
  { href: "#", icon: Facebook },
  { href: "#", icon: Linkedin },
  { href: "#", icon: Twitter },
  { href: "#", icon: Youtube },
  { href: "#", icon: Instagram },
];

const legalLinks = [
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
                <Logo />
                <p className="mt-4 text-muted-foreground max-w-xs">Join our community to stay up-to-date with the latest news.</p>
            </div>
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
      <div className="container mx-auto px-4 mt-16">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 text-sm text-muted-foreground border-t border-muted/20">
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
