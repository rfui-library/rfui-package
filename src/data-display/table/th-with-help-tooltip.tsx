import { ReactNode } from "react";
import { Flex } from "../../layout/flex";
import { HelpTooltip } from "../../overlays/help-tooltip";

export type ThWithHelpTooltipType = {
  cellContent: ReactNode;
  tooltipContent: string;
};

export const ThWithHelpTooltip = ({
  cellContent,
  tooltipContent,
}: ThWithHelpTooltipType) => {
  return (
    <th>
      <Flex className="items-center gap-1">
        {cellContent}{" "}
        <HelpTooltip
          content={tooltipContent}
          style={{ textTransform: "none" }}
          direction="bottom"
        />
      </Flex>
    </th>
  );
};
