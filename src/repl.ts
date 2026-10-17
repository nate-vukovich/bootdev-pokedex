export function cleanInput(input: string): string[] {
    return input.trim().split(/\s+/).map((item) => item.toLowerCase());
}