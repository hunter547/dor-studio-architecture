import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from "react"
import "./totop.scss"

const PREFIX = 'ToTop';

const classes = {
  iconColor: `${PREFIX}-iconColor`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.iconColor}`]: {
    color: theme.palette.icon,
  }
}));

const ToTop = () => {

  const [showArrow, setShowArrow] = useState(false)
  const toTopRef = useRef(null)
  const intersectionDivRef = useRef(null)

  const intersectionOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, intersectionOptions)
    if (intersectionDivRef.current) observer.observe(intersectionDivRef.current)
    return () => {
      if (intersectionDivRef.current) observer.unobserve(intersectionDivRef.current)
    }
  }, [intersectionDivRef, intersectionOptions])

  function handleIntersection(entries) {
    const [entry] = entries
    entry.isIntersecting ? setShowArrow(false) : setShowArrow(true)
  }

  function scrollToTop() {
    if (typeof window !== undefined) {
      window.scrollTo(0, 0)
    }
  }

  return (
    <Root>
      <div
        onClick={() => scrollToTop()}
        className={`totop ${classes.iconColor} ${showArrow && "totop-show"}`}
        ref={toTopRef}
      >
        <i className="fa fa-angle-up" />
      </div>
      <div ref={intersectionDivRef} id="intersection-div" />
    </Root>
  );
}

export default ToTop
