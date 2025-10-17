"use client";
import { SearchInput } from "@/components/search-input";
import DottedGlowBackground from "@/components/ui/dotted-glow-background";
import { LoaderFive } from "@/components/ui/loader";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import UserCard from "@/components/user-card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import LogRocket from "logrocket";
import { useEffect } from "react";
export default function Home() {
  const [people, setPeople] = useState<
    {
      firstName: string;
      lastName: string;
      nationality: string;
      industry: string;
      image: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    // simulate fetch
    setTimeout(() => {
      setPeople(peopleData);
      setLoading(false);
    }, 5000);
  };
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_LOGROCKET_APP_ID
    ) {
      LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID);
    }
  }, []);
  return (
    <div className="h-screen flex flex-col   items-center px-4">
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100 w-5/6 right-0"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      <h2 className="mb-10 sm:mb-10 text-xl text-center sm:text-3xl dark:text-white text-black">
        Find people you can trust, for anything.
      </h2>
      {/*     <PlaceholdersAndVanishInput
        placeholders={peopleNames}
        onChange={handleChange}
        onSubmit={onSubmit}
      /> */}
      <SearchInput onSubmit={onSubmit} />
      {loading && (
        <div className="w-full h-100 flex justify-center align-center h-20">
          <LoaderFive text="Searching People..." />
        </div>
      )}

      {!loading && !!people.length && (
        <section aria-label="User grid" className="mb-10">
          <UserCard {...people[0]} className="mb-5 w-[300px]" />
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
            More like{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{`${people[0].firstName} ${people[0].lastName}`}</span>{" "}
          </h1>

          <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-15">
            {people.slice(1).map((person, idx) => (
              <UserCard key={idx} {...person} relativeUser={{ ...people[0] }} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
const peopleData = [
  {
    firstName: "Alex",
    lastName: "Carter",
    nationality: "United States",
    industry: "Information Technology",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    firstName: "Alex",
    lastName: "Miller",
    nationality: "Australia",
    industry: "Design",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    firstName: "Jordan",
    lastName: "Carter",
    nationality: "Canada",
    industry: "Operations",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    firstName: "Taylor",
    lastName: "Carter",
    nationality: "United States",
    industry: "Finance",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    firstName: "Sam",
    lastName: "Johnson",
    nationality: "Ireland",
    industry: "Marketing",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    firstName: "Alex",
    lastName: "Brown",
    nationality: "United Kingdom",
    industry: "Media",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    firstName: "Jamie",
    lastName: "Lee",
    nationality: "Canada",
    industry: "Information Technology",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    firstName: "Morgan",
    lastName: "Davis",
    nationality: "United States",
    industry: "Education",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
  },
];
