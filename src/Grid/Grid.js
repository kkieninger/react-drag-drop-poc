import React from 'react';

// Shell / base layout for demo purposes
export const Widget = (props) => {
  return(
    <div className={"widget " + props.size}>
      {
        props.title && true &&
        <h2>{props.title}</h2>
      }
      { props.src && props.title && false &&
        <iframe
          id={props.title.replace(/\s/g, '-')}
          title={props.title}
          src={props.src}
        />
      }
    </div>
  )
};

/**
 * The WidgetWrapper and forwardRef method allow us to mimic something
 * conceptually similar to slots in Vue:
 * https://reactjs.org/docs/forwarding-refs.html
 */
export const WidgetWrapper = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className={"widget-wrapper " + props.size}
    style={props.style}
  >
    {props.children}
  </div>
));

/**
 * Implementing said wrapper
 */
export const GridItem = ({ forwardedRef, ...props }) => (
  <WidgetWrapper ref={forwardedRef} {...props} />
);
