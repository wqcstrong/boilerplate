import { exec } from 'child_process';

interface CloneObject {
  url: string;
  branch?: string;
  localPath: string;
}

export default function gitClone(
  params: CloneObject,
  callback: (err: Error | null) => void
) {
  const { url, branch = '', localPath } = params;
  const args = ['git clone'];
  if (!!branch === true) {
    args.push(`-b ${branch}`);
  }
  args.push('--');
  args.push(url);
  args.push(localPath);
  exec(args.join(' '), (err) => {
    callback && callback(err);
  });
}
