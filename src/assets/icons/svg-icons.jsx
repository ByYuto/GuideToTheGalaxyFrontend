import React from 'react';
import styled from 'styled-components';

const SVGIcon = styled(React.Fragment)`
    & svg {
        & path, clipPath {
            fill: #1F1F3D;
        }
    }

    &:hover {
        & svg:hover {
            & path, clipPath {
                fill: #9695B7;
            }
    }
`;

export const ImageMediaIcon = ({ color = '#1F1F3D', hover = '#9695B7', size }) => (
  <>
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M0.950684 16.1662C0.950684 17.2162 1.80568 18.0637 2.84818 18.0637H17.0532C18.1032 18.0637 18.9507 17.2087 18.9507 16.1662V1.96122C18.9507 0.911221 18.0957 0.0637207 17.0532 0.0637207H2.84818C1.79818 0.0637207 0.950684 0.918721 0.950684 1.96122V16.1662ZM16.6107 16.7437H3.29068C2.78068 16.7437 2.35318 16.3387 2.35318 15.8362V14.2987L5.55568 11.2012L8.28568 13.8487C8.45068 14.0062 8.71318 14.0062 8.88568 13.8487L13.8282 9.06372L17.5407 12.6637V15.8362C17.5407 16.3387 17.1207 16.7437 16.6107 16.7437ZM3.23068 1.44372H16.6632C17.1807 1.44372 17.6082 1.85622 17.6082 2.35872V10.3837L14.1582 7.03872C13.9932 6.87372 13.7232 6.87372 13.5582 7.03872L8.57818 11.8687L5.81818 9.19122C5.65318 9.02622 5.38318 9.02622 5.21818 9.19122L2.29318 12.0262V2.35872C2.29318 1.85622 2.71318 1.44372 3.23068 1.44372Z"
          fill="#1F1F3D"
        />
        <path
          d="M6.5307 7.27873C7.7982 7.27873 8.82571 6.25123 8.82571 4.99123C8.82571 3.73123 7.7982 2.69623 6.5307 2.69623C5.2707 2.69623 4.2432 3.72373 4.2432 4.99123C4.2357 6.24373 5.2632 7.27873 6.5307 7.27873ZM6.5307 3.88123C7.13821 3.88123 7.6332 4.37623 7.6332 4.98373C7.6332 5.59123 7.13821 6.08623 6.5307 6.08623C5.92321 6.08623 5.4282 5.59123 5.4282 4.98373C5.4282 4.37623 5.92321 3.88123 6.5307 3.88123Z"
          fill="#1F1F3D"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="18" height="18" fill="white" transform="translate(0.950684 0.0637207)" />
        </clipPath>
      </defs>
    </svg>
  </>
);

export const VideoMediaIcon = ({ color = '#1F1F3D', hover = '#9695B7', size }) => (
  <>
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.42637 13.1275C7.37887 13.1275 5.15137 13.06 2.80387 12.94C1.41637 12.865 0.343867 11.7925 0.186367 10.3375C-0.0686328 7.9075 -0.0686328 5.455 0.186367 3.04C0.336367 1.6 1.41637 0.527496 2.79637 0.437496C6.84637 0.182496 11.0089 0.182496 15.1864 0.437496C16.5889 0.519996 17.6389 1.57 17.8039 3.0325C18.0589 5.3575 18.0589 7.81 17.8039 10.33C17.6539 11.785 16.6039 12.8275 15.1939 12.9325C13.4164 13.06 11.4739 13.1275 9.42637 13.1275ZM8.95387 1.66C7.07887 1.66 5.18887 1.7125 3.33637 1.825C2.36137 1.885 1.63387 2.5825 1.52137 3.5575C1.28887 5.62 1.28887 7.7275 1.52137 9.8125C1.63387 10.8025 2.35387 11.5 3.32887 11.545C5.48137 11.6575 7.51387 11.71 9.38887 11.71C11.2564 11.71 13.0264 11.6575 14.6539 11.545C15.6364 11.4775 16.3639 10.78 16.4689 9.8125C16.7014 7.6525 16.7014 5.5525 16.4689 3.5575C16.3564 2.575 15.6289 1.8775 14.6539 1.825C12.7489 1.7125 10.8289 1.66 8.95387 1.66ZM7.23637 4.99V8.2375C7.23637 8.575 7.59637 8.8 7.89637 8.6425L11.0164 7.03C11.3389 6.865 11.3464 6.3925 11.0164 6.2275L7.89637 4.5925C7.59637 4.4275 7.23637 4.645 7.23637 4.99Z"
        fill="#1F1F3D"
      />
    </svg>
  </>
);

export const HaveFive = ({ color = '#1F1F3D', hover = '#9695B7', size }) => (
  <>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M3.6974 5.30193C3.67466 5.30193 3.65192 5.30193 3.62918 5.29435L1.47651 4.89256C1.27185 4.85465 1.13542 4.65755 1.17331 4.45286C1.21121 4.24818 1.41587 4.11172 1.61295 4.14963L3.76562 4.55142C3.97027 4.58932 4.10671 4.78643 4.06881 4.99111C4.03849 5.18063 3.87932 5.30193 3.6974 5.30193Z"
          fill="#1F1A36"
        />
        <path
          d="M1.17319 7.03039C0.96853 7.03039 0.801774 6.87119 0.794194 6.65892C0.786614 6.44666 0.953374 6.2723 1.16561 6.2723L3.35618 6.21165H3.36376C3.56841 6.21165 3.73517 6.37085 3.74275 6.58311C3.75033 6.79538 3.58357 6.96974 3.37134 6.96974L1.18077 7.03039H1.17319Z"
          fill="#1F1A36"
        />
        <path
          d="M4.99295 2.07245C4.91715 2.07245 4.83378 2.04971 4.76556 1.99664L2.97672 0.685143C2.80996 0.563848 2.77206 0.321258 2.89334 0.154477C3.0222 -0.0123036 3.25717 -0.0502088 3.42393 0.0710862L5.21277 1.38259C5.37952 1.50388 5.41742 1.74647 5.29615 1.91325C5.22793 2.01939 5.10665 2.07245 4.99295 2.07245Z"
          fill="#1F1A36"
        />
        <path
          d="M4.2501 3.49009C4.20462 3.49009 4.15156 3.48251 4.10608 3.45977L2.02163 2.60312C1.83213 2.51973 1.73359 2.29988 1.81697 2.11036C1.90035 1.92084 2.12017 1.82229 2.30966 1.90568L4.39412 2.76232C4.58361 2.84571 4.68215 3.06556 4.59877 3.25508C4.53814 3.39912 4.4017 3.49009 4.2501 3.49009Z"
          fill={color}
        />
        <path
          d="M16.7651 6.59828C16.3558 6.31778 15.6357 6.17374 14.8323 6.62102C14.3775 6.87119 14.0136 7.21233 13.718 7.57622C13.6725 7.2275 13.6271 6.71199 13.6271 6.04487C13.6271 4.63482 13.9303 3.53558 14.0743 3.22476C14.1501 3.06556 14.3699 2.51973 14.1273 2.04213C14.0288 1.83745 13.8014 1.57212 13.3011 1.46598C13.2481 1.4584 13.195 1.45082 13.1268 1.45082C13.142 1.35985 13.142 1.26888 13.1268 1.17791C13.0813 0.889831 12.9221 0.63208 12.6796 0.4653C12.3688 0.245452 12.005 0.199967 11.6336 0.328843C11.3304 0.434976 11.0423 0.654824 10.7619 0.9429C10.6785 0.7837 10.5572 0.632079 10.3602 0.55627C10.2995 0.533527 9.7765 0.344003 9.13222 0.662403C8.77597 0.836764 8.45761 1.14 8.19232 1.54179C8.02556 1.4205 7.80575 1.35227 7.54045 1.40533C6.45654 1.64034 5.63034 3.76301 5.08459 7.72026C4.15985 14.4597 6.22156 16.4232 8.1241 17.386C8.9882 17.8181 9.65523 18 10.2313 18C11.0878 18 11.7548 17.6134 12.581 17.0751C12.6493 17.0221 14.2562 15.6651 14.5973 13.8911C15.4235 9.5321 16.2724 8.68303 16.7348 8.22818C16.9394 8.02349 17.1365 7.82639 17.1972 7.45492C17.2502 7.13653 17.0835 6.81813 16.7651 6.59828ZM16.2042 7.68993C15.6888 8.20544 14.7337 9.16063 13.862 13.7471C13.574 15.2405 12.1414 16.4611 12.1414 16.4611C10.9665 17.2192 10.3147 17.6361 8.47278 16.7037C7.30548 16.1124 4.87236 14.8842 5.84257 7.81881C6.51718 2.88362 7.47982 2.23166 7.66173 2.15585C7.68447 2.14827 7.69205 2.14069 7.71479 2.14069C7.85123 2.17101 7.76027 2.33021 7.69205 2.51973C7.60109 2.74716 7.52529 2.98975 7.44949 3.25508C6.66119 6.12826 6.74457 8.2206 6.75215 8.31157L7.51013 8.28125C7.51013 8.2585 7.42676 6.21165 8.18474 3.45977C8.56373 2.06488 9.08674 1.54179 9.45815 1.35227C9.80682 1.17033 10.0342 1.20823 10.0797 1.2613C10.1631 1.32194 10.1858 1.51147 10.1707 1.70099C9.64765 2.46667 9.22318 3.39154 9.00336 4.11173C8.43488 5.96148 8.47278 8.21302 8.47278 8.30399L9.23076 8.28883C9.23076 8.26608 9.20044 6.06003 9.73103 4.33158C10.1403 2.98975 11.1333 1.30678 11.8989 1.04903C12.0429 1.00355 12.149 1.01113 12.2627 1.08694C12.3309 1.14 12.384 1.21581 12.3915 1.29162C12.4067 1.36743 12.3764 1.45082 12.3157 1.52663C11.914 2.03455 11.6108 2.65619 11.3834 3.31573C11.1788 3.82365 11.0196 4.38464 10.9438 4.9608C10.9286 5.05935 10.9211 5.14274 10.9059 5.23371C10.7619 6.10552 10.7088 6.93184 10.6937 7.56106C10.6633 8.36464 10.7012 8.75126 10.7088 8.77401L11.0954 8.72852L11.4668 8.70578C11.4668 8.69062 11.4365 8.11447 11.4668 7.28814C11.4971 6.80296 11.5502 6.17374 11.6487 5.41565C11.7397 4.81676 11.8837 4.19512 12.0808 3.61139C12.3385 2.97459 12.6568 2.48941 12.9297 2.29989C12.9828 2.26198 13.0813 2.20134 13.1495 2.2165C13.3087 2.24682 13.4072 2.30747 13.4527 2.39086C13.5209 2.5349 13.4527 2.78507 13.3921 2.91394C13.1798 3.36122 12.8691 4.56659 12.8691 6.06003C12.8691 6.947 12.9979 7.93252 13.0965 8.56932C12.9525 8.8574 12.8463 9.12273 12.7781 9.31225C12.2248 9.26677 11.0878 9.23644 10.254 9.72162C9.17012 10.3584 8.38181 11.7306 8.34391 11.7836L9.00336 12.1627C9.01094 12.1475 9.73103 10.9118 10.6406 10.3736C11.5199 9.85808 12.9752 10.0931 12.9828 10.0931L13.3239 10.1462L13.4072 9.80501C13.4148 9.78985 13.8696 8.01591 15.1885 7.28056C15.5675 7.06829 15.9616 7.03039 16.2497 7.16685C16.3937 7.24266 16.4392 7.32605 16.4392 7.33363C16.4316 7.45493 16.3937 7.50799 16.2042 7.68993Z"
          fill={color}
          stroke={color}
          strokeWidth="0.2"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </>
);

export const PlusIcon = ({ color = '#1F1F3D', hover = '#9695B7', size }) => (
  <>
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: '10px' }}
    >
      <rect x="6.01855" width="1.6" height="12" rx="0.8" fill={color} />
      <rect x="0.818359" y="6.8" width="1.6" height="12" rx="0.8" transform="rotate(-90 0.818359 6.8)" fill={color} />
    </svg>
  </>
);

export const FileIcon = ({ color = '#1F1F3D', hover = '#9695B7', size }) => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M18.305 4.93L13.7228 0.168372C13.6555 0.101096 13.5658 0.0637207 13.4687 0.0637207H6.64391C5.87398 0.0637207 5.25355 0.684153 5.25355 1.44661V6.29046H2.48777C1.91219 6.29046 1.44873 6.75392 1.44873 7.3295V12.5247C1.44873 13.0928 1.91219 13.5637 2.48777 13.5637H5.25355V16.6808C5.25355 17.4433 5.87398 18.0637 6.63644 18.0637H17.0119C17.7743 18.0637 18.3947 17.4433 18.3947 16.6808V5.1692C18.4022 5.0795 18.3648 4.99728 18.305 4.93ZM13.7004 1.36439L16.9745 4.76555H13.7004V1.36439ZM2.82415 12.6518C2.64474 12.6518 2.50272 12.5097 2.50272 12.3303V7.51638C2.50272 7.33698 2.64474 7.19495 2.82415 7.19495H11.4952C11.6746 7.19495 11.8167 7.33698 11.8167 7.51638V12.3378C11.8167 12.5172 11.6746 12.6592 11.4952 12.6592H2.82415V12.6518ZM17.4604 16.3519C17.4604 16.7182 17.1614 17.0097 16.7951 17.0097H6.86069C6.49441 17.0097 6.19541 16.7107 6.19541 16.3445V13.6385H11.8316C12.3773 13.6385 12.8258 13.19 12.8258 12.6443V7.36688C12.8258 6.8212 12.3773 6.37269 11.8316 6.37269H6.19541V1.76804C6.19541 1.40176 6.49441 1.10276 6.86069 1.10276H12.8258V5.4084C12.8258 5.58781 12.9753 5.73731 13.1547 5.73731H17.4604V16.3519Z"
        fill="#1F1F3D"
      />
      <path
        d="M5.58243 8.84694C5.47031 8.69744 5.32828 8.60026 5.15635 8.55541C5.04423 8.52551 4.80502 8.51056 4.44622 8.51056H3.48193V11.4856H4.07994V10.3644H4.46864C4.73775 10.3644 4.94705 10.3494 5.08908 10.3195C5.19373 10.2971 5.29838 10.2523 5.40303 10.1775C5.50768 10.1028 5.58991 10.0056 5.65718 9.88597C5.72446 9.7589 5.75436 9.6094 5.75436 9.42252C5.75436 9.18332 5.70203 8.99644 5.58243 8.84694ZM5.07413 9.66172C5.02928 9.729 4.96948 9.77385 4.88725 9.81122C4.80502 9.84112 4.64805 9.85607 4.41632 9.85607H4.07994V9.01139H4.37147C4.58825 9.01139 4.73027 9.01886 4.80502 9.03381C4.9022 9.04876 4.98443 9.09362 5.04423 9.16837C5.10403 9.23564 5.1414 9.32534 5.1414 9.43747C5.1414 9.5197 5.11898 9.59445 5.07413 9.66172Z"
        fill="#1F1F3D"
      />
      <path
        d="M8.63959 9.3179C8.57231 9.13102 8.48261 8.96657 8.35553 8.83949C8.22846 8.70494 8.07895 8.61524 7.90703 8.56291C7.77995 8.52554 7.5856 8.50311 7.33892 8.50311H6.24756V11.4782H7.3763C7.60055 11.4782 7.77248 11.4558 7.90703 11.4184C8.08643 11.3586 8.22846 11.2838 8.32563 11.1792C8.46018 11.0446 8.57231 10.8727 8.64706 10.6559C8.70686 10.4765 8.73676 10.2672 8.73676 10.0206C8.73676 9.74398 8.70686 9.51225 8.63959 9.3179ZM8.05653 10.5438C8.01915 10.6784 7.96683 10.7755 7.89955 10.8279C7.83228 10.8877 7.75753 10.925 7.66035 10.9549C7.5856 10.9774 7.466 10.9848 7.29407 10.9848H6.84557V9.01889H7.11467C7.36135 9.01889 7.5258 9.02637 7.60802 9.04879C7.72015 9.07122 7.80985 9.11607 7.8846 9.19082C7.95935 9.2581 8.01168 9.35527 8.05653 9.48235C8.0939 9.60195 8.11633 9.78135 8.11633 10.0131C8.11633 10.2299 8.10138 10.4093 8.05653 10.5438Z"
        fill="#1F1F3D"
      />
      <path
        d="M11.2858 9.01139V8.51056H9.24512V11.4856H9.84312V10.2224H11.084V9.72152H9.84312V9.01886H11.2858V9.01139Z"
        fill="#1F1F3D"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="18" height="18" fill="white" transform="translate(0.922363 0.0637207)" />
      </clipPath>
    </defs>
  </svg>
);

export const BoldIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.7762 9.70379C16.0731 8.88343 15.0303 8.31327 13.6473 7.99291C14.6165 7.54757 15.2024 7.24684 15.4055 7.09066C15.8977 6.72343 16.2688 6.31319 16.5184 5.86013C16.7684 5.40691 16.8933 4.90694 16.8933 4.36014C16.8933 3.85238 16.8114 3.37584 16.6472 2.9305C16.4831 2.48508 16.2293 2.07886 15.8856 1.71171C15.534 1.34465 15.1356 1.04761 14.6903 0.821037C14.2762 0.617988 13.9011 0.46567 13.5652 0.364124C12.7606 0.153153 12.0145 0.0476675 11.327 0.0476675H10.4598C10.3036 0.0476675 10.1452 0.0456974 9.98507 0.041757C9.82507 0.038063 9.74109 0.0360107 9.7333 0.0360107C9.69434 0.0360107 9.63955 0.038063 9.56903 0.0417981C9.49872 0.0457384 9.44389 0.0477086 9.40489 0.0477086L8.87747 0.0594885L4.42454 0.211806L1.37776 0.282158L1.42464 1.25472C2.08078 1.34075 2.52629 1.39169 2.76057 1.4072C3.15899 1.43064 3.42854 1.48937 3.5692 1.583C3.65523 1.64559 3.7021 1.69242 3.7099 1.72366C3.78797 1.89551 3.83082 2.32127 3.83878 3.00102C3.86998 4.1573 3.90523 5.7354 3.94419 7.73531L3.96762 13.5594C3.96762 14.5593 3.93253 15.3173 3.86222 15.8328C3.83098 16.0204 3.74885 16.2196 3.61607 16.4305C3.25668 16.5789 2.77625 16.7001 2.17469 16.7938C1.99512 16.8171 1.72944 16.864 1.37793 16.9346L1.35449 18.0361C3.22159 17.9734 4.28404 17.9306 4.54217 17.9071C6.21389 17.8054 7.37809 17.7626 8.03428 17.7781L10.3427 17.8248C11.2493 17.856 12.0227 17.813 12.6632 17.696C13.6787 17.5085 14.4715 17.2739 15.0421 16.9926C15.6201 16.7114 16.1669 16.2895 16.6824 15.7271C17.0734 15.2975 17.3504 14.8405 17.5144 14.3559C17.7411 13.6921 17.8542 13.0632 17.8542 12.4694C17.8544 11.454 17.4952 10.532 16.7762 9.70379ZM7.60068 1.39567C8.21003 1.29412 8.71784 1.24335 9.12407 1.24335C10.4599 1.24335 11.4562 1.53637 12.1123 2.12225C12.776 2.70804 13.1082 3.4386 13.1082 4.31352C13.1082 5.55578 12.7607 6.43074 12.0654 6.93851C11.3702 7.44623 10.3389 7.70022 8.97175 7.70022C8.45614 7.70022 8.03038 7.67293 7.69451 7.61825C7.68659 7.35257 7.68269 7.05183 7.68269 6.71584L7.69451 5.56744C7.70223 4.34102 7.67879 3.25123 7.62416 2.29796C7.60848 2.0402 7.60068 1.73962 7.60068 1.39567ZM13.4601 14.9304C13.171 15.4928 12.6943 15.9343 12.0305 16.2547C11.3663 16.5751 10.5225 16.735 9.49918 16.735C8.99917 16.735 8.45228 16.6104 7.85857 16.3603C7.76482 16.1339 7.71791 15.9617 7.71774 15.8445L7.68269 12.6805L7.69451 10.6532V8.96564C7.90548 8.88753 8.30005 8.84854 8.87812 8.84854C10.1828 8.84854 11.1475 8.97356 11.7726 9.22348C12.421 9.47369 12.9718 9.96582 13.425 10.7002C13.7452 11.216 13.9054 11.919 13.9054 12.8097C13.9052 13.6766 13.7567 14.3836 13.4601 14.9304Z"
      fill="#1F1F3D"
    />
  </svg>
);

export const ItalicIcon = () => (
  <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5649 0.951039C12.2916 0.970659 12.0258 0.988349 11.768 1.00386C10.6117 1.07401 9.77563 1.10927 9.26014 1.10927C8.9945 1.10927 8.70923 1.10135 8.40468 1.08583L4.69002 0.921692L4.46731 2.12874C4.54538 2.14426 4.69388 2.16002 4.91265 2.17566C5.71722 2.22237 6.27978 2.33188 6.60009 2.50373V2.94907L6.50635 3.53486L6.24858 5.1169L6.06101 5.85522L5.72116 7.69502C5.72116 7.70294 5.70745 7.74789 5.68011 7.82994C5.65277 7.9119 5.61756 8.03102 5.57471 8.18723C5.53165 8.34357 5.48293 8.52524 5.42814 8.73223C5.37334 8.93918 5.31091 9.201 5.24056 9.51742C5.17025 9.83375 5.1038 10.1639 5.04137 10.5076L4.90067 11.2576L4.24452 14.3983L3.92806 16.0268C3.83427 16.5271 3.67424 16.9217 3.44767 17.2105C3.13515 17.3669 2.68202 17.5191 2.08826 17.6677C1.51798 17.816 1.21724 17.8942 1.18601 17.902L0.986816 18.8983C1.17419 18.8827 1.55697 18.8476 2.13517 18.7927C3.17423 18.699 3.85389 18.656 4.17413 18.6638L6.49449 18.6872C7.4787 18.7889 8.04504 18.8552 8.19338 18.8866C8.34184 18.9099 8.45127 18.9217 8.52149 18.9217C8.66224 18.9217 8.82617 18.9139 9.01367 18.8983C9.0527 18.8905 9.14263 18.8866 9.28321 18.8866C9.29881 18.8085 9.3339 18.6482 9.38865 18.4059C9.43532 18.1794 9.4627 17.9528 9.4707 17.7261C9.23613 17.6872 8.97853 17.648 8.697 17.6092C8.26763 17.5623 7.80255 17.4802 7.3025 17.3631C7.27935 17.207 7.27537 17.1015 7.29096 17.0467L7.43175 16.5194L7.9357 13.7656L8.381 11.914L9.09592 8.26953C9.26761 7.43356 9.5255 6.23846 9.8695 4.68359C9.90081 4.38675 9.95138 4.0664 10.0219 3.7226C10.1156 3.27735 10.2095 2.93368 10.3031 2.69135C10.5922 2.57425 10.9869 2.4532 11.4867 2.32818C11.9089 2.23456 12.3345 2.11343 12.764 1.96501C12.8111 1.79312 12.8621 1.59393 12.9166 1.36736C12.948 1.21882 12.9714 1.07048 12.9868 0.922102C12.979 0.921815 12.8383 0.931543 12.5649 0.951039Z"
      fill="#1F1F3D"
    />
  </svg>
);

export const UnderlineIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.15623 2.03528C2.10942 2.05876 2.6836 2.2112 2.87877 2.49179C3.01151 2.68732 3.078 3.51918 3.078 4.98786V8.89025C3.078 10.1169 3.14039 11.0426 3.26537 11.6676C3.43743 12.5972 3.7616 13.3591 4.23814 13.9527C4.70671 14.5387 5.40607 15.0154 6.33566 15.3824C7.24973 15.7417 8.3591 15.9214 9.66367 15.9214C10.8042 15.9214 11.8004 15.7927 12.6522 15.5349C13.4879 15.2848 14.1989 14.937 14.7847 14.4918C15.3631 14.0388 15.8005 13.5583 16.0971 13.0504C16.3002 12.6911 16.4606 12.2143 16.5778 11.621C16.7419 10.7695 16.8006 9.58161 16.7537 8.05831C16.6444 5.11288 16.5584 3.5661 16.4958 3.41764C16.4958 3.33181 16.4899 3.21069 16.4784 3.05447C16.4666 2.89813 16.4606 2.79285 16.4606 2.7381C16.4606 2.53497 16.5194 2.37469 16.6365 2.25762C16.6837 2.21079 16.992 2.14426 17.5623 2.05831C17.8671 2.05051 18.1954 1.99957 18.5468 1.90599C18.5783 1.71854 18.5936 1.59746 18.5936 1.54266C18.5936 1.44112 18.5704 1.24184 18.5235 0.945129L18.3125 0.921692C17.3749 1.02328 16.6094 1.06223 16.0155 1.03883L13.6133 0.921692H12.629L12.6054 1.92959L12.7696 1.96465L13.9415 1.94125C14.2772 1.93345 14.5781 2.06631 14.8437 2.3398C14.992 2.50385 15.086 2.84748 15.1249 3.37093L15.1715 4.0625C15.2187 4.73432 15.2713 5.35726 15.33 5.9314C15.3887 6.50562 15.4317 6.98416 15.4589 7.36687C15.4862 7.74977 15.4999 8.24974 15.4999 8.86694C15.4999 10.0857 15.4179 10.9799 15.2538 11.5502C15.1213 12.0034 14.9139 12.4489 14.633 12.8863C14.4998 13.1051 14.246 13.355 13.8709 13.6365C13.5352 13.8941 13.1486 14.0933 12.7109 14.2339C12.0311 14.4528 11.2851 14.562 10.4728 14.562C9.77724 14.562 9.08617 14.3785 8.39858 14.0111C7.92205 13.7535 7.5471 13.3942 7.27366 12.9332C6.92219 12.324 6.72292 11.5346 6.676 10.5658L6.51195 7.28478L6.5 4.6015C6.5 4.55479 6.49799 4.45513 6.49409 4.30282C6.49015 4.1505 6.48818 4.02379 6.48818 3.92208C6.48818 3.00025 6.53896 2.48473 6.64046 2.3753C6.78908 2.17993 7.09758 2.08228 7.56631 2.08228C8.06645 2.08228 8.55074 2.04719 9.01947 1.97688V1.87139L8.99607 1.12146L9.00769 0.957319C8.77341 0.972916 8.43753 0.980797 7.99999 0.980797C7.76571 0.988595 7.19531 1.00813 6.28907 1.03937C5.64828 1.06285 4.99209 1.07442 4.32027 1.07442C4.05458 1.07442 3.4062 1.04725 2.37494 0.992453C1.96872 0.961259 1.53118 0.945703 1.06244 0.945703C0.851472 0.945703 0.695213 0.949479 0.59375 0.95736L0.628926 1.98866C0.691355 2.00409 0.867151 2.01977 1.15623 2.03528Z"
      fill="#1F1F3D"
    />
    <path
      d="M18.2183 17.4218H0.968696C0.859352 17.4218 0.769464 17.4569 0.699154 17.5273C0.628761 17.5977 0.59375 17.6874 0.59375 17.7968V18.5468C0.59375 18.6562 0.628926 18.7461 0.699154 18.8163C0.769464 18.8867 0.859188 18.9216 0.968696 18.9216H18.2183C18.3278 18.9216 18.4177 18.8867 18.4879 18.8163C18.5582 18.7461 18.5931 18.6562 18.5931 18.5468V17.7968C18.5931 17.6874 18.5581 17.5977 18.4879 17.5273C18.4177 17.4569 18.3278 17.4218 18.2183 17.4218Z"
      fill="#1F1F3D"
    />
  </svg>
);

export const LinkIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M17.8208 6.93292L13.8233 11.4179C13.5533 11.7254 13.0808 11.7479 12.7808 11.4779C12.4733 11.2079 12.4508 10.7354 12.7208 10.4354L16.7183 5.95043C17.2958 5.30542 17.2358 4.31542 16.5908 3.73792L15.5558 2.80792C14.9108 2.23792 13.9208 2.29042 13.3433 2.93542L8.93331 7.87793C8.35581 8.52293 8.41581 9.51293 9.06081 10.0904C9.36831 10.3604 9.39081 10.8329 9.12081 11.1329C8.85081 11.4404 8.37831 11.4629 8.07831 11.1929C6.81831 10.0829 6.71331 8.14792 7.83081 6.89542L12.2408 1.95292C13.3583 0.700424 15.2933 0.587924 16.5458 1.70542L17.5808 2.62792C18.8333 3.74542 18.9383 5.67292 17.8208 6.93292Z"
        fill="#1F1F3D"
      />
      <path
        d="M1.36574 12.9104L5.36324 8.43291C5.63324 8.12541 6.10574 8.10291 6.40574 8.37291C6.71324 8.64291 6.73574 9.11541 6.46574 9.41541L2.46824 13.9004C1.89074 14.5454 1.95074 15.5354 2.59574 16.1129L3.63074 17.0354C4.27574 17.6129 5.26574 17.5529 5.84324 16.9079L10.2532 11.9654C10.8307 11.3204 10.7707 10.3304 10.1257 9.75291C9.81824 9.48291 9.79574 9.01041 10.0657 8.71041C10.3357 8.40291 10.8082 8.38041 11.1082 8.65041C12.3607 9.76791 12.4732 11.7029 11.3557 12.9554L6.94574 17.8979C5.82824 19.1504 3.89324 19.2629 2.64074 18.1454L1.60574 17.2229C0.35324 16.0979 0.24824 14.1704 1.36574 12.9104Z"
        fill="#1F1F3D"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="18" height="17.9775" fill="white" transform="translate(0.593262 0.932922)" />
      </clipPath>
    </defs>
  </svg>
);

export const PDFIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M18.305 4.93L13.7228 0.168372C13.6555 0.101096 13.5658 0.0637207 13.4687 0.0637207H6.64391C5.87398 0.0637207 5.25355 0.684153 5.25355 1.44661V6.29046H2.48777C1.91219 6.29046 1.44873 6.75392 1.44873 7.3295V12.5247C1.44873 13.0928 1.91219 13.5637 2.48777 13.5637H5.25355V16.6808C5.25355 17.4433 5.87398 18.0637 6.63644 18.0637H17.0119C17.7743 18.0637 18.3947 17.4433 18.3947 16.6808V5.1692C18.4022 5.0795 18.3648 4.99728 18.305 4.93ZM13.7004 1.36439L16.9745 4.76555H13.7004V1.36439ZM2.82415 12.6518C2.64474 12.6518 2.50272 12.5097 2.50272 12.3303V7.51638C2.50272 7.33698 2.64474 7.19495 2.82415 7.19495H11.4952C11.6746 7.19495 11.8167 7.33698 11.8167 7.51638V12.3378C11.8167 12.5172 11.6746 12.6592 11.4952 12.6592H2.82415V12.6518ZM17.4604 16.3519C17.4604 16.7182 17.1614 17.0097 16.7951 17.0097H6.86069C6.49441 17.0097 6.19541 16.7107 6.19541 16.3445V13.6385H11.8316C12.3773 13.6385 12.8258 13.19 12.8258 12.6443V7.36688C12.8258 6.8212 12.3773 6.37269 11.8316 6.37269H6.19541V1.76804C6.19541 1.40176 6.49441 1.10276 6.86069 1.10276H12.8258V5.4084C12.8258 5.58781 12.9753 5.73731 13.1547 5.73731H17.4604V16.3519Z"
        fill="#1F1F3D"
      />
      <path
        d="M5.58243 8.84694C5.47031 8.69744 5.32828 8.60026 5.15635 8.55541C5.04423 8.52551 4.80502 8.51056 4.44622 8.51056H3.48193V11.4856H4.07994V10.3644H4.46864C4.73775 10.3644 4.94705 10.3494 5.08908 10.3195C5.19373 10.2971 5.29838 10.2523 5.40303 10.1775C5.50768 10.1028 5.58991 10.0056 5.65718 9.88597C5.72446 9.7589 5.75436 9.6094 5.75436 9.42252C5.75436 9.18332 5.70203 8.99644 5.58243 8.84694ZM5.07413 9.66172C5.02928 9.729 4.96948 9.77385 4.88725 9.81122C4.80502 9.84112 4.64805 9.85607 4.41632 9.85607H4.07994V9.01139H4.37147C4.58825 9.01139 4.73027 9.01886 4.80502 9.03381C4.9022 9.04876 4.98443 9.09362 5.04423 9.16837C5.10403 9.23564 5.1414 9.32534 5.1414 9.43747C5.1414 9.5197 5.11898 9.59445 5.07413 9.66172Z"
        fill="#1F1F3D"
      />
      <path
        d="M8.63959 9.3179C8.57231 9.13102 8.48261 8.96657 8.35553 8.83949C8.22846 8.70494 8.07895 8.61524 7.90703 8.56291C7.77995 8.52554 7.5856 8.50311 7.33892 8.50311H6.24756V11.4782H7.3763C7.60055 11.4782 7.77248 11.4558 7.90703 11.4184C8.08643 11.3586 8.22846 11.2838 8.32563 11.1792C8.46018 11.0446 8.57231 10.8727 8.64706 10.6559C8.70686 10.4765 8.73676 10.2672 8.73676 10.0206C8.73676 9.74398 8.70686 9.51225 8.63959 9.3179ZM8.05653 10.5438C8.01915 10.6784 7.96683 10.7755 7.89955 10.8279C7.83228 10.8877 7.75753 10.925 7.66035 10.9549C7.5856 10.9774 7.466 10.9848 7.29407 10.9848H6.84557V9.01889H7.11467C7.36135 9.01889 7.5258 9.02637 7.60802 9.04879C7.72015 9.07122 7.80985 9.11607 7.8846 9.19082C7.95935 9.2581 8.01168 9.35527 8.05653 9.48235C8.0939 9.60195 8.11633 9.78135 8.11633 10.0131C8.11633 10.2299 8.10138 10.4093 8.05653 10.5438Z"
        fill="#1F1F3D"
      />
      <path
        d="M11.2858 9.01139V8.51056H9.24512V11.4856H9.84312V10.2224H11.084V9.72152H9.84312V9.01886H11.2858V9.01139Z"
        fill="#1F1F3D"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="18" height="18" fill="white" transform="translate(0.922363 0.0637207)" />
      </clipPath>
    </defs>
  </svg>
);
