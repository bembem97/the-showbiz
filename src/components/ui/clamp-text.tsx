"use client";

import { cn } from "@/lib/utils";
import Button from "@mui/material/Button";
import React, { useState } from "react";

interface Props extends React.ComponentProps<"p"> {
  text: string;
  ContainerProps?: React.HTMLProps<HTMLDivElement>;
  ButtonProps?: React.HTMLProps<HTMLButtonElement>;
  ContainerClassName?: string;
  lineClamp?: number;
}

export default function ClampText(props: Props) {
  const {
    className,
    text,
    ButtonProps,
    ContainerProps,
    ContainerClassName,
    lineClamp = 5,
    ...rest
  } = props;
  const targetRef = React.useRef<null | HTMLParagraphElement>(null);

  const [collapse, setCollapse] = useState(false);
  const [isButtonShown, setIsButtonShown] = useState(false);

  React.useEffect(() => {
    const target = targetRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (target) {
        const computedStyles = window.getComputedStyle(target);
        const FONT_SIZE = parseFloat(
          computedStyles.getPropertyValue("font-size"),
        );

        const LINE_HEIGHT_PX = parseFloat(
          computedStyles.getPropertyValue("line-height"),
        );
        const LINE_HEIGHT = Number((LINE_HEIGHT_PX / FONT_SIZE).toFixed(2));
        const CLAMP_HEIGHT = LINE_HEIGHT * FONT_SIZE * lineClamp;

        if (CLAMP_HEIGHT >= target.scrollHeight) {
          setIsButtonShown(false);
        } else {
          setIsButtonShown(true);
        }
      }
    });

    if (target) {
      resizeObserver.observe(target);
    }

    return () => {
      if (target) {
        resizeObserver.unobserve(target);
      }
    };
  }, [setIsButtonShown, lineClamp]);

  return (
    <div
      className={cn("relative gap-y-2.5 pb-2", ContainerClassName)}
      data-slot="long-text"
      {...ContainerProps}
    >
      <p
        {...rest}
        ref={targetRef}
        style={{ "--line": lineClamp } as React.CSSProperties}
        className={cn(collapse ? undefined : "line-clamp-(--line)", className)}
      >
        {text}
      </p>

      {isButtonShown ? (
        <Button
          onClick={() => setCollapse((collapse) => !collapse)}
          className={cn(
            "text-static transition-shadows hover:drop-shadow-glow-2 float-end cursor-pointer self-end text-xs font-bold text-primary uppercase",
            ButtonProps?.className,
          )}
        >
          {collapse ? "Read Less" : "Read More"}
        </Button>
      ) : null}
    </div>
  );
}
