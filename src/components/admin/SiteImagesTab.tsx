import { SectionImageManager } from "@/components/admin/SectionImageManager";
import { LabeledImageManager } from "@/components/admin/LabeledImageManager";

const serviceSlots = [
  { key: "body-toning", label: "Body Toning" },
  { key: "weight-loss", label: "Weight Loss" },
  { key: "body-building", label: "Body Building" },
  { key: "cardio", label: "Cardio Training" },
  { key: "yoga", label: "Yoga Training" },
  { key: "boxing", label: "Boxing Training" },
  { key: "dance", label: "Dance Aerobics" },
  { key: "diet", label: "Diet Training" },
  { key: "gym-accessories", label: "Gym Accessories" },
];

const serviceIconSlots = [
  { key: "body-toning-icon", label: "Body Toning", iconSize: true },
  { key: "weight-loss-icon", label: "Weight Loss", iconSize: true },
  { key: "body-building-icon", label: "Body Building", iconSize: true },
  { key: "cardio-icon", label: "Cardio Training", iconSize: true },
  { key: "yoga-icon", label: "Yoga Training", iconSize: true },
  { key: "boxing-icon", label: "Boxing Training", iconSize: true },
  { key: "dance-icon", label: "Dance Aerobics", iconSize: true },
  { key: "diet-icon", label: "Diet Training", iconSize: true },
  { key: "gym-accessories-icon", label: "Gym Accessories", iconSize: true },
];

const teamSlots = [
  { key: "adebayo-williams", label: "Adebayo Williams - Founder & Head Coach" },
  { key: "eteng-elvis", label: "Eteng Elvis - Assistant Coach" },
  { key: "lawal-oluwatobi", label: "Lawal Oluwatobi - Substitute Coach" },
  { key: "uthman-raheem", label: "Uthman Raheem - Boxing Coach" },
  { key: "yusuf-mimololuwami", label: "Yusuf Mimololuwami - Yoga instructor" },
  { key: "akande-moses", label: "Akande Moses Oluwafemi - Data Manager" },
];

export function SiteImagesTab() {
  return (
    <div className="space-y-6">
      <SectionImageManager section="hero" label="Hero Image" description="Circular spotlight image on the home page hero section" replaceOnly />
      <SectionImageManager section="about-story" label="About Story Image" description="Image on the About Us page story section" replaceOnly />
      <SectionImageManager section="home-about" label="Home About Section" description="Image on the homepage about section" replaceOnly />
      <SectionImageManager section="philosophy" label="Training Philosophy Image" description="Image on the Services page philosophy section" replaceOnly />

      <LabeledImageManager
        section="services"
        slots={serviceSlots}
        title="Service Images"
        description="Background images for each service card on the Services page"
        columns={5}
        defaultOpen={false}
      />

      <LabeledImageManager
        section="service-icons"
        slots={serviceIconSlots}
        title="Service Icons"
        description="Small icon badges for each service card"
        columns={7}
        defaultOpen={false}
      />

      <LabeledImageManager
        section="team"
        slots={teamSlots}
        title="Team Photos"
        description="Profile photos for each team member on the About page"
        columns={5}
        defaultOpen={false}
      />
    </div>
  );
}
