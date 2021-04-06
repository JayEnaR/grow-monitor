import { ITarget } from "../models/ITarget";

// Info retreived from https://www.royalqueenseeds.com/blog-indoor-cannabis-growing-relative-humidity-and-temperatures-n243
export const Targets: ITarget[] = [
    {
        phase: "Seedling",
        temperature: 22.5,
        humidity: 67.5,
        tempMin: 20,
        tempMax: 25,
        humMin: 65,
        humMax: 70
    },
    {
        phase: "Vegetative",
        temperature: 25,
        humidity: 55,
        tempMin: 22,
        tempMax: 28,
        humMin: 40,
        humMax: 70
    },
    {
        phase: "Flowering",
        temperature: 23,
        humidity: 45,
        tempMin: 20,
        tempMax: 26,
        humMin: 40,
        humMax: 50
    }
]