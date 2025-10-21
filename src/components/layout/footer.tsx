import Link from "next/link";
import { Twitter } from "lucide-react";
import DiscordIcon from "../icons/discord";

const footerLinks = [
    { href: "#", label: "About Us" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
]

const socialLinks = [
  { href: "#", icon: Twitter },
  { href: "#", icon: DiscordIcon },
];

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
            {footerLinks.map(({ href, label }) => (
                <Link key={label} href={href} className="hover:text-primary-foreground">
                    {label}
                </Link>
            ))}
        </div>
        <div className="flex items-center gap-4">
            <p className="text-sm">&copy; {new Date().getFullYear()} BaseLance. All rights reserved.</p>
            <div className="flex gap-2">
                {socialLinks.map(({ href, icon: Icon }) => (
                <Link key={href} href={href} className="text-muted-foreground hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                </Link>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}
