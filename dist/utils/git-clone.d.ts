interface CloneObject {
  url: string;
  branch?: string;
  localPath: string;
}
export default function gitClone(
  params: CloneObject,
  callback: (err: Error | null) => void
): void;
export {};
