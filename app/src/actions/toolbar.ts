import type {
  CommandNames,
  CommandParams,
  SxcGlobal,
} from "@2sic.com/2sxc-typings";

declare const $2sxc: SxcGlobal;

export function edit(
  tag: HTMLElement,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  params: CommandParams
): void {
  event.preventDefault();

  $2sxc(tag)
    .cms.run({
      action: "edit" as CommandNames,
      params,
      workflows: [],
    })
    .then(function (data: unknown) {
      console.log("after run", data);
      return false;
    });
}

export function add(
  tag: HTMLElement,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  params: CommandParams
): void {
  event.preventDefault();

  $2sxc(tag)
    .cms.run({
      action: "add" as CommandNames,
      params,
      workflows: [],
    })
    .then(function (data: unknown) {
      console.log("after run", data);
      return false;
    });
}
