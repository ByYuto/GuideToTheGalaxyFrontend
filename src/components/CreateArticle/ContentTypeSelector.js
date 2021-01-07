import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
//import ScrollContainer from 'react-indiana-drag-scroll';
import Button from '../UI/Button';
import { GoPlus } from 'react-icons/go';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import {screen} from '../../utils/constants';

const StyledContentType = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => (props.active ? props.theme.accentColors.primary.color : props.theme.baseColors.darkMiddle)};
  border-radius: 8px;
  border: 1px solid transparent;
  padding-right: 8px;
  padding-left: 8px;
  cursor: ${(props) => (props.readOnly ? 'default' : 'pointer')};
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 0;
  flex-shrink: 0;
  height: 2rem;
  min-width: 100px;
  margin: 0 8px;
  position: relative;

  &.custom-container-input {
    width: 180px;
  }

  &:hover {
    ${(props) =>
      !props.readOnly
        ? css`
            border: 1px solid ${props.theme.accentColors.primary.color};
            background-color: #5767f9;
          `
        : null}
  }

  h6 {
    padding: 0;
    margin: 0;
    display: block;
    flex-grow: 1;
    color: ${(props) => (props.active ? props.theme.baseColors.white : props.theme.baseColors.light)};
    text-transform: uppercase;

    &:focus {
      outline: none;
    }
  }

  & input {
    padding: 0;
    margin: 0;
    display: block;
    flex-grow: 1;
    color: ${(props) => (props.active ? props.theme.baseColors.white : props.theme.baseColors.light)};
    text-transform: uppercase;
    background-color: transparent;
    border: none;
    width: 80%;   

    &:focus {
      outline: none;
    }

    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${props => props.theme.baseColors.light};
      opacity: 1; /* Firefox */
    }
    
    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: ${props => props.theme.baseColors.light};
    }
    
    &::-ms-input-placeholder { /* Microsoft Edge */
      color: ${props => props.theme.baseColors.light};
    }
  }

  button {
    margin-left: 10px;
    position: absolute;
    left: 140px;
  }

  & .close-custom-cat svg:hover {
    color: white;
  }
`;

const ArrowButton = styled.button`
  all: unset;
  font-size: 1.5em;
  cursor: pointer;
  height: 42px;
  @media(max-width: ${screen.SM}) {
    display: none;
  }
`;



const StyledContentTypeSelector = styled.div`
  display: flex;
  overflow: hidden;
  margin: 8px 0;
  width: 100%;
`;

const AddContentTypeButton = styled(Button)`
  display: flex;
  font-size: 12px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: ${(props) => props.theme.baseColors.middle};
  color: ${(props) => props.theme.baseColors.darker};
`;

const ContentType = ({ className, value, active, onClick, readOnly }) => {
  const _onClick = () => {
    !readOnly && onClick && onClick(value);
  };
  return (
    <StyledContentType className={className} onClick={_onClick} active={active} readOnly={readOnly}>
      <h6>{value}</h6>
    </StyledContentType>
  );
};

const CustomContentType = ({
  className,
  value,
  active,
  onClick,
  readOnly,
  onChange,
  editableRef,
  onClearContentType,
  onBlur,
  onChangeCustom,
  setNewContentTypeShow
}) => {
  const [currentKey, setCurrentKey] = useState(null);
  const [isFocus, setFocus] = useState(false);
  const [previousLetter, setPreviousLetter] = useState(null);
  const [inputVal, setInputVal] = useState(value);

  const _onBlur = (val) => {
    const value = val;
    if(value === "NEW CONTENT TYPE" || value  === '') {
      setNewContentTypeShow(false);
      return;
    }
    setFocus(false);
    onChange && onChange(value);
    onBlur && onBlur(value);
  };
  const _onKeyDown = (e) => {
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) || //Uppercase letters
      (e.keyCode >= 97 && e.keyCode <= 122) || //Lowercase letters
      e.keyCode === 32 || //SPACE
      e.keyCode === 8 || //BACKPSPACE
      e.keyCode === 46 || //SUPR/DELETE
      e.keyCode === 37 || //LEFT ARROW
      e.keyCode === 39 || // RIGHT ARROW
      e.keyCode === 35 || // END
      e.keyCode === 36 || // HOME
      e.key === '&' //Ampersand
    ) {
      //Valid
      if(e.target.value.length > 21 && e.keyCode !== 8 && e.keyCode !== 46) {
        e.preventDefault();
        return;
      }
      if(previousLetter === 32 && e.keyCode === 32){
        e.preventDefault();
        return;
      }
      setPreviousLetter(e.keyCode);
      return;
      
    } else if (e.keyCode === 13) {
      //const value = (e.target.textContent || e.target.innerText).toUpperCase() || null;
      //onChange && onChange(value);
      //onBlur && onBlur(value);
      e.preventDefault();
      setCurrentKey(e.keyCode);
      if(e.target.value === "NEW CONTENT TYPE" || e.target.value  === '') {
        setNewContentTypeShow(false);
        return;
      }
      onChange && onChange(e.target.value);
        onBlur && onBlur(e.target.value);
    } else if (e.keyCode === 27) {
      if(!inputVal) {
        setNewContentTypeShow(false);
        onChangeCustom(null);
        onChange && onChange(null);
         onBlur && onBlur(null);
      } else {
        onChangeCustom(inputVal);
        onChange && onChange(inputVal);
         onBlur && onBlur(inputVal);
      }
      
    } else {
      e.preventDefault();
    }
  };

  const _onPaste = (e) => {
    e.preventDefault();
    let text = (e.originalEvent || e).clipboardData.getData('text/plain');
    text = text.replace(/(<([^>]+)>)/gi, ''); //Remove HTML tags
    text = text.replace(/[^0-9a-z\s&]/gi, ''); //Remove all characters except numbers, letters, spaces and &
    text = text.replace(/\s\s+/g, ' '); //Convert multiple spaces into one
    document.execCommand('insertHTML', false, text.toUpperCase());
  };


 useEffect(()=>{
   if(active && editableRef && editableRef.current) {
    editableRef.current.focus();
   } 

   
 }, [active])

 useEffect(()=> {
  if(currentKey === 13 && editableRef && editableRef.current) {
    editableRef.current.blur();
    setFocus(false);
    setInputVal(value);
   }
 }, [currentKey])
  return (
    <StyledContentType className={`${className} custom-container-input`} active={active} readOnly={readOnly} >
      <input 
        value={value}  
        onBlur={(e)=>{
          setFocus(false);
          _onBlur(e.target.value)}}
        onKeyDown={_onKeyDown}
        onPaste={_onPaste}
        onFocus={()=>setFocus(true)}
        onChange={(e)=> {

          onChangeCustom(e.target.value)}}
        readOnly={false}
        placeholder="New Content Type"
        ref={editableRef}
          />
      {!isFocus ? (
        <Button className="close-custom-cat" onClick={onClearContentType} transparent secondary icon>
          <IoIosClose size={28} />
        </Button>
      ) : null}
    </StyledContentType>
  );
};

/*
const convertToText = (contentType) => {
  return contentType.replace('_', ' ').toUpperCase();
};
*/

const ContentTypeSelector = ({ contentTypes, value, onChange, onCustomContentBlur, readOnly }) => {
  const containerRef = useRef(null);
  const editableRef = useRef(null);
  const [newContentType, setNewContentType] = useState(null);
  const [newContentTypeShow, setNewContentTypeShow] = useState(false);
  const {newArticle} = useSelector(store => store.newArticle);
  const onContentTypeClick = (contentType) => {
    setNewContentTypeShow(false);
    setNewContentType("");
    !readOnly && onChange && onChange(contentType);
  };

  useEffect(() => {
    if (newContentType && containerRef && editableRef && containerRef.current && editableRef.current) {
      containerRef.current.scrollLeft += 999999;
      //editableRef.current.focus();
      //window.getSelection().selectAllChildren(editableRef.current);
    }

    if (newContentType === null && containerRef && editableRef && containerRef.current && editableRef.current) {
      containerRef.current.scrollLeft += 999999;
    }
  }, [newContentType, editableRef, containerRef]);


  useEffect(()=> {
    setNewContentType(null);
    setNewContentTypeShow(false);
  }, [newArticle.categoryId]);

  const onRightArrowClick = () => (containerRef.current.scrollLeft += 50);
  const onLeftArrowClick = () => (containerRef.current.scrollLeft -= 50);

  const onAddNewContentTypeClick = (e) => {
    const contentType = '';
    setNewContentType(contentType);
    setNewContentTypeShow(true);
    onChange(contentType);
  };

  const onClearContentType = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNewContentType(null);
    setNewContentTypeShow(false);
    onChange(null);
    onCustomContentBlur(null);
  };

  const onCustomContentChange = (newContentType) => {
    setNewContentType(newContentType);
    onChange(newContentType);
  };
  
  return (
    <StyledContentTypeSelector>
      <ArrowButton onClick={onLeftArrowClick}>
        <FiChevronLeft />
      </ArrowButton>

      <div
        ref={containerRef}
        className="content-type-list"
        style={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'row',
          margin: '0',
          padding: '0 0 10px 0',
          flexWrap: 'nowrap',
          flexGrow: '1',
          alignItems: 'center',
        }}
      >
        {contentTypes.map((contentType) => (
          <ContentType
            key={contentType.name}
            value={contentType.name}
            active={contentType.name === value}
            onClick={onContentTypeClick}
            readOnly={readOnly}
          />
        ))}
        {!newContentTypeShow ? (
          <AddContentTypeButton primary circle onClick={onAddNewContentTypeClick} className="custom-content-type" icon>
            <GoPlus />
          </AddContentTypeButton>
        ) : (
          <CustomContentType
            value={newContentType}
            active={newContentTypeShow}
            onClick={onCustomContentChange}
            readOnly={readOnly}
            onChange={onCustomContentChange}
            editableRef={editableRef}
            onClearContentType={onClearContentType}
            onBlur={onCustomContentBlur}
            onChangeCustom={setNewContentType}
            setNewContentTypeShow={setNewContentTypeShow}

          />
        )}
      </div>

      <ArrowButton onClick={onRightArrowClick}>
        <FiChevronRight />
      </ArrowButton>
    </StyledContentTypeSelector>
  );
};

ContentTypeSelector.propTypes = {
  contentTypes: PropTypes.array.isRequired,
};

export default ContentTypeSelector;
