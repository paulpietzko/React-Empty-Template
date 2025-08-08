import type {
  CommandNames,
  CommandParams,
  SxcGlobal,
} from "@2sic.com/2sxc-typings";

declare const $2sxc: SxcGlobal;

export function openDialog(
  tag: HTMLElement,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  action: CommandNames,
  params: CommandParams
): void {
  event.preventDefault();

  $2sxc(tag).cms.run({
    action,
    params,
    workflows: [],
  });
}
