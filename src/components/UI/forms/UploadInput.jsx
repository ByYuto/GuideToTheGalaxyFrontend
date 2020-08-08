import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PlaceholderImg from '../../../assets/images/Rectangle.png';
import { StyledFieldTooltip } from '../../../views/CreateArticle/StyledComponents';

const UploadInputLayout = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 74%;
  cursor: pointer;
  &:hover {
    button {
      color: #6670f0;
      opacity: 1;
      & svg path,
      svg rect {
        fill: #6670f0;
      }
    }
  }
  & button {
    border-radius: 50%;
    background-color: #151531;
    opacity: 0.7;
    border: none;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
    outline: 0;
    color: white;
    width: 82px;
    height: 82px;
    font-size: 12px;
    cursor: pointer;
    position: absolute;
    &:hover {
      color: #6670f0;
      opacity: 1;
      & svg path,
      svg rect {
        fill: #6670f0;
      }
    }
    & svg {
      margin-bottom: 5px;
    }
  }

  & img {
    position: absolute;
    width: 100%;
    height: auto;
    z-index: 2;
  }

  & input {
    z-index: -1;
  }
`;

export default function UploadInput() {
  const [srcImg, setImg] = useState(PlaceholderImg);
  const inputRef = useRef(null);
  const handleImgSelect = () => inputRef.current.click();
  const handleFileChange = (e) => {
    e.preventDefault();
    const dataSrc = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      setImg(reader.result);
    };
    reader.readAsDataURL(dataSrc);
  };
  return (
    <UploadInputLayout onClick={handleImgSelect}>
      <img src={srcImg} />
      <button>
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0)">
            <path
              d="M16.5451 16.9245H2.45489C1.3797 16.9245 0.5 16.0448 0.5 14.9696V5.54852C0.5 4.47333 1.3797 3.59363 2.45489 3.59363H16.5451C17.6203 3.59363 18.5 4.47333 18.5 5.54852V14.9696C18.5 16.0448 17.6203 16.9245 16.5451 16.9245ZM2.45489 5.09739C2.20677 5.09739 2.00376 5.30039 2.00376 5.54852V14.9696C2.00376 15.2177 2.20677 15.4207 2.45489 15.4207H16.5451C16.7932 15.4207 16.9962 15.2177 16.9962 14.9696V5.54852C16.9962 5.30039 16.7932 5.09739 16.5451 5.09739H2.45489Z"
              fill="#F6F8FF"
            />
            <path
              d="M9.50003 14.2403C7.30454 14.2403 5.52258 12.4583 5.52258 10.2628C5.52258 8.06736 7.30454 6.2854 9.50003 6.2854C11.6955 6.2854 13.4775 8.06736 13.4775 10.2628C13.4775 12.4583 11.6955 14.2403 9.50003 14.2403ZM9.50003 7.78916C8.13912 7.78916 7.02634 8.90194 7.02634 10.2628C7.02634 11.6237 8.13912 12.7365 9.50003 12.7365C10.8609 12.7365 11.9737 11.6237 11.9737 10.2628C11.9737 8.90194 10.8684 7.78916 9.50003 7.78916Z"
              fill="#F6F8FF"
            />
            <path
              d="M12.7368 2.39817H6.26311C5.84958 2.39817 5.51123 2.05982 5.51123 1.64629C5.51123 1.23276 5.84958 0.894409 6.26311 0.894409H12.7368C13.1503 0.894409 13.4887 1.23276 13.4887 1.64629C13.4887 2.05982 13.1503 2.39817 12.7368 2.39817Z"
              fill="#F6F8FF"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="18" height="18" fill="white" transform="translate(0.5)" />
            </clipPath>
          </defs>
        </svg>
        Upload
      </button>
      <input type="file" onChange={handleFileChange} ref={inputRef} />
      {/*tooltipVisible && tooltip && <StyledFieldTooltip>{tooltip}</StyledFieldTooltip>*/}
    </UploadInputLayout>
  );
}
