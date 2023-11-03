"use client";

import { InfoDialog } from "@/components/info-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";

import { CHARACTERS } from "@/data/characters";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Character = (typeof CHARACTERS)[0];

export default function Home() {
	const target = CHARACTERS[11];
	const [guess, setGuess] = useState("");
	const [open, setOpen] = useState(false);
	const [guessList, setGuessList] = useState<typeof CHARACTERS>([]);
	const filteredCharacters = CHARACTERS.filter((c) =>
		c.name.toLocaleLowerCase().includes(guess.trim().toLocaleLowerCase())
	);

	function compareInfo(compareTarget: string[], toCompare: string[]) {
		const equals = toCompare.filter((c) => compareTarget.includes(c));

		if (
			equals.length === compareTarget.length &&
			compareTarget.length === toCompare.length
		) {
			return "correct";
		} else if (equals.length === 0) {
			return "wrong";
		} else {
			return "semi";
		}
	}

	return (
		<div className="w-[90%] my-12">
			<header className="flex justify-between items-center w-full">
				<Button
					variant="ghost"
					size="icon"
					asChild
					className="opacity-0 pointer-events-none"
				>
					<Link href="/">
						<ArrowLeft size="1.25rem" />
					</Link>
				</Button>
				<h1 className="text-xl font-bold">QSMPdle</h1>
				<InfoDialog />
			</header>
			<main className="mt-16 flex flex-col items-center">
				<div className="flex gap-3 max-w-[512px] w-full items-center justify-center">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={open}
								className="w-96 justify-between"
							>
								{guess
									? CHARACTERS.find(
											(character) =>
												character.name.toLocaleLowerCase() ===
												guess
									  )?.name
									: "Select character..."}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-96 p-0">
							<Command>
								<CommandInput placeholder="Search character..." />
								<CommandEmpty>No character found.</CommandEmpty>
								<CommandGroup className="max-h-48 overflow-y-auto">
									{CHARACTERS.sort((a, b) =>
										a.name !== b.name
											? a.name < b.name
												? -1
												: 1
											: 0
									).map((character) => (
										<CommandItem
											key={character.name}
											value={character.name}
											onSelect={(currentValue) => {
												setGuess(
													currentValue === guess
														? ""
														: currentValue
												);
												setOpen(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													guess === character.name
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											{character.name}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
					<Button
						onClick={() => {
							const cha = CHARACTERS.find(
								(c) =>
									c.name.toLocaleLowerCase() ===
									guess.trim().toLocaleLowerCase()
							);

							if (cha) {
								setGuessList((old) => [...old, cha]);
							} else {
								return;
							}
						}}
					>
						Adivinhar
					</Button>
				</div>
				<div className="mt-8">
					<div className="header flex items-center gap-2 mb-2">
						<span>Personagem</span>
						<span>Pais</span>
						<span>Linguas</span>
						<span>Especies</span>
						<span>Gênero</span>
						<span>Chegada na Ilha</span>
					</div>
					<div className="flex flex-col-reverse gap-3">
						{guessList.map((g) => (
							<div className="row flex gap-2" key={g.name}>
								<span>
									<Image
										alt={`Skin de ${g.name}`}
										src={g.skin}
										width={128}
										height={128}
										className="w-full h-full rounded-md"
									/>
								</span>
								<span
									data-state={
										target.country === g.country
											? "correct"
											: "wrong"
									}
								>
									{g.country}
								</span>
								<span
									data-state={compareInfo(
										target.languages,
										g.languages
									)}
								>
									{g.languages.join(", ")}
								</span>
								<span
									data-state={compareInfo(
										target.species,
										g.species
									)}
								>
									{g.species.join(", ")}
								</span>
								<span
									data-state={
										target.gender === g.gender
											? "correct"
											: "wrong"
									}
								>
									{g.gender}
								</span>
								<span
									data-state={
										target.howArrive === g.howArrive
											? "correct"
											: "wrong"
									}
								>
									{g.howArrive}
								</span>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
