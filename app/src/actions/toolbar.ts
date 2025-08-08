import type {
  CommandNames,
  CommandParams,
  SxcGlobal,
} from "@2sic.com/2sxc-typings";

declare const $2sxc: SxcGlobal;

export function openDialog(
  tag: HTMLElement,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  action: string,
  params: CommandParams
): void {
  event.preventDefault();

  const workflowToLog = {
    command: "all",
    phase: "all",
    code: (wfArgs: unknown) => {
      console.log(
        "Toolbar asked to do something - here are the details.",
        wfArgs
      );
    },
  };
  console.log("action", action, "params", params);
  $2sxc(tag)
    .cms.run({
      action: action as CommandNames,
      params,
      workflows: [workflowToLog],
    })
    .then(function (data: unknown) {
      console.log("after run", data);
      return false;
    });
}