export default function removeLeadingZeroAfterSpace(input: string): string {
  return input.replace(/(?<=\s)0+(?=\d+)/g, "");
}
