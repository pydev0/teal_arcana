import Navbar from "@/components/Navbar";
import CardDraw from "@/components/CardDraw";

export const metadata = {
  title: "The Major Arcana — Teal Arcana",
  description: "Draw from the Major Arcana and receive your reading.",
};

export default function CardsPage() {
  return (
    <>
      <Navbar />
      <CardDraw />
    </>
  );
}
