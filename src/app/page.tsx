import { BoldNav } from "@/components/bold/BoldNav";
import { BoldHero } from "@/components/bold/BoldHero";
import { BoldProcess } from "@/components/bold/BoldProcess";
import {
  BoldServices,
  BoldWhy,
  BoldFaq,
  BoldFooter,
} from "@/components/bold/BoldSections";
import { BoldTestimonials } from "@/components/bold/BoldTestimonials";
import { BoldContact } from "@/components/bold/BoldContact";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <BoldNav />
      <main>
        <BoldHero />
        <BoldServices />
        <BoldWhy />
        <BoldProcess />
        <BoldFaq />
        <BoldTestimonials />
        <BoldContact />
      </main>
      <BoldFooter />
    </div>
  );
}
