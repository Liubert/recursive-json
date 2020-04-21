import * as React from 'react';
import styled from 'styled-components';
import {useState, useEffect, useCallback} from "react";
import { generateId } from "../helpers/utils";

export const PropertyName = styled.div`
  color: #008080;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

export const ExpandableProperty = (props:any)=> {
  const { title, expanded, children, onLvlChange, onLvlUnMount } = props;
  const [isOpen, setIsOpen] = useState(false);
  const id = useCallback(() => { generateId() }, [],);

  useEffect(() => {
      setIsOpen(expanded);
  }, [expanded]);

  useEffect(() => {
      if(onLvlChange) onLvlChange({ id, isOpen });
      return ()=> onLvlUnMount({ id });
  }, [isOpen, id, onLvlChange, onLvlUnMount]);

    return (
      <React.Fragment>
        <PropertyName onClick={() => setIsOpen(!isOpen)}>
          {title}
          {isOpen ? '-' : '+'}
        </PropertyName>
        {isOpen ? children : null}
        {React.Children.count(children) === 0 && isOpen ? 'The list is empty!' : null}
      </React.Fragment>
    );

};