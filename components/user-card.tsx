"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BadgeInfo, Check, Info } from "lucide-react";
import { CardSpotlight } from "./ui/card-spotlight";
import { Highlighter } from "./ui/highligher";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { BorderBeam } from "./ui/border-beam";

export type UserCardProps = {
  image: string;
  firstName: string;
  lastName: string;
  industry: string;
  nationality: string;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  className?: string;
  relativeUser?: {
    firstName: string;
    lastName: string;
    nationality: string;
    industry: string;
    image: string;
  };
};

export default function UserCard({
  image,
  firstName,
  lastName,
  industry,
  nationality,
  selected,
  onSelectedChange,
  className,
  relativeUser,
}: UserCardProps) {
  const isControlled = typeof selected === "boolean";
  const [internalSelected, setInternalSelected] = React.useState<boolean>(
    selected ?? false
  );
  const name = `${firstName} ${lastName}`;

  React.useEffect(() => {
    if (isControlled) setInternalSelected(selected as boolean);
  }, [isControlled, selected]);

  const isSelected = isControlled ? (selected as boolean) : internalSelected;

  function toggleSelected() {
    const next = !isSelected;
    if (!isControlled) setInternalSelected(next);
    onSelectedChange?.(next);
  }
  const firstNameMatched =
    firstName.toLowerCase() === relativeUser?.firstName.toLowerCase();
  const lastNameMatched =
    lastName.toLowerCase() === relativeUser?.lastName.toLowerCase();
  const nationalityMatched =
    nationality.toLowerCase() === relativeUser?.nationality.toLowerCase();
  const industryMatched =
    industry.toLowerCase() === relativeUser?.industry.toLowerCase();
  const matchedTooltipContent = [];
  if (firstNameMatched) matchedTooltipContent.push("First Name");
  if (lastNameMatched) matchedTooltipContent.push("Last Name");
  if (nationalityMatched) matchedTooltipContent.push("Nationality");
  if (industryMatched) matchedTooltipContent.push("Industry");

  const matchedTooltipText =
    firstName +
    " has " +
    matchedTooltipContent.join(", ") +
    ` in common with ${relativeUser?.firstName}`;

  return (
    <div
      data-selected={isSelected ? "true" : "false"}
      className={cn(
        "group relative  rounded-xl border bg-card shadow-sm transition-all duration-200 p-5 cursor-default min-w-[250px] hover:border-neutral-300",
        "hover:-translate-y-1 hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-primary",
        "data-[selected=true]:ring-2 data-[selected=true]:ring-primary data-[selected=true]:shadow-md",
        className
      )}
    >

      {/* <CardSpotlight className="h-full w-full"> */}
      <div className="h-full w-full flex flex-col flex-1 items-center">
        {/* Select toggle button */}
        <div className="flex space-between">
          <button
            type="button"
            onClick={toggleSelected}
            aria-pressed={isSelected}
            aria-label={isSelected ? `Deselect ${name}` : `Select ${name}`}
            className={cn(
              "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
              "bg-background text-muted-foreground hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isSelected
                ? "bg-primary text-primary-foreground border-transparent text-white hover:bg-primary/90"
                : "border-border"
            )}
          >
            <Check className="h-4 w-4" color={isSelected ? "white" : "black"} />
            <span className="sr-only">
              {isSelected ? "Selected" : "Not selected"}
            </span>
          </button>

          {relativeUser != null && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full"
                  aria-label="User information"
                >
                  <Info size={15} color="#aaaaaaff"/>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{matchedTooltipText}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Avatar */}
        <div className="mb-4 sm:mb-5">
          <img
            src={image || "/placeholder.svg"}
            alt={`${name} profile photo`}
            className="h-17 w-17 sm:h-24 sm:w-24 rounded-full object-cover ring-1 ring-border transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>

        {/* Name */}
        <h3
          className={
            "text-balance text-lg sm:text-xl font-semibold  text-center text-[#5B2E91]"
          }
        >
          {firstNameMatched ? (
            <Highlighter
              action="highlight"
              color="#87CEFA"
              padding={0}
              strokeWidth={0.1}
            >
              {firstName}
            </Highlighter>
          ) : (
            <span>{firstName}</span>
          )}{" "}
          {lastNameMatched ? (
            <Highlighter
              action="highlight"
              color="#87CEFA"
              padding={0}
              strokeWidth={0.1}
            >
              {lastName}
            </Highlighter>
          ) : (
            <span>{lastName}</span>
          )}
        </h3>

        {/* Meta */}
        <div className="mt-1 text-center text-sm">
          {industryMatched ? (
            <Highlighter
              action="highlight"
              color="#ffb6c1a2"
              padding={0}
              strokeWidth={0.1}
              iterations={1}
            >
              <div className={cn("text-pretty text-[#6C5A7A]")}>{industry}</div>
            </Highlighter>
          ) : (
            <div className={cn("text-pretty text-[#6C5A7A]")}>{industry}</div>
          )}
          {nationalityMatched ? (
            <Highlighter
              action="highlight"
              color="#90ee908b"
              padding={0}
              strokeWidth={0.1}
              iterations={1}
            >
              <div className="text-pretty ">{nationality}</div>
            </Highlighter>
          ) : (
            <div className="text-pretty ">{nationality}</div>
          )}
        </div>
      </div>
      {/* </CardSpotlight> */}
    </div>
  );
}
