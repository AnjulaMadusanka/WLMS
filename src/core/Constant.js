import Swal from 'sweetalert2';
import { DeviceUUID } from 'device-uuid';
import country from "./countries.json";
import _ from "lodash";
import { Repository } from './repository';
import { useState } from 'react';
import { baseURL } from './repository/Repository';

export const USER_ROLE = {
    admin: 0,
    student: 1,
};

export const MINIMUM_PASSWORD_CHARACTERS = 7;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
export const PHONE_REGEX = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const FIND_IS_NUMBER_INCLUDED_REGEX = /\d+/;
export const Find_SPECIAL_CHARACTER = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const IMAGE_URL = `${baseURL}storage/`;
export const DATE_FORMAT = "DD/MM/YYYY";
export const TIME_FORMAT = "hh:mm:ss A";

export const getText = (e) => e.target.value;

export const setText = (text) => {
    return {
        target: {
            value: text
        }
    }
}

export const setChecked = (value)=>{
return {
    target: {
        checked: value
    }
}
}

export const onToast = (title, payload, showCancelButton = true) => {
    Swal.fire({
        title,
        text: payload?.message,
        icon: payload?.status_code == 1 ? 'success' : 'error',
        cancelButtonText: 'Close',
        cancelButtonColor: '#9834F0',
        showConfirmButton: false,
        showCancelButton,
        toast: true,
        timerProgressBar: true,
        timer: 5000,
    })
}

export const REST_PASSWORD_STATE = {
    ENTER_EMAIL: 0,
    OTP_VERIFICATION: 1,
    RESET_PASSWORD: 2
}

export const getFile = (e) => e.target.files[0];


export const generateUniqIdForDevice = async () => {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;
    let uid = navigatorInfo.mimeTypes.length;
    uid += navigatorInfo.userAgent.replace(/\D+/g, '');
    uid += navigatorInfo.plugins.length;
    uid += screenInfo.height || '';
    uid += screenInfo.width || '';
    uid += screenInfo.pixelDepth || '';
    return uid//uuid.visitorId;
}

export const getDeviceId = async () => {
    let machineId = localStorage.getItem('DeviceId');
    if (!machineId) {
        machineId = await generateUniqIdForDevice();
        localStorage.setItem('DeviceId', machineId);
    }

    return machineId;
};


export const onGetCurrencySymble = (code) => {
    const data = _.find(country, i => _.get(i, 'currency.code', 'USD') == code);
    return _.get(data, 'currency.symbol', '$');
}

export const getSourcePath = (path) => {
    if (_.isNull(path) || path == '') {
        return path;
    }
    const repo = new Repository();
    const url = repo.IMAGE_URL;
    return `${url}${path}`
}

export const convertStringDate = (inputDateString) => {
    // Create a Date object from the input string
    const inputDate = new Date(inputDateString);

    // Get day, month, and year components
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = inputDate.getFullYear();

    // Pad day and month with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}-${formattedDay}`;
}

export const convertStringTime = (timeString) => {
    // Parse the time string into a Date object
    const date = new Date(timeString);

    // Extract hours and minutes
    const hours24 = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM or PM
    const ampm = hours24 >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    const hours12 = (hours24 % 12) || 12;

    return {
        convertTime: {
            time: `${(hours12 < 10 ? '0' : '') + hours12}:${(minutes < 10 ? '0' : '') + minutes}`,
            timeExt: ampm,
        }
    }

}
const maxLength = 100;
export const makeTruncate = (text = '') => {
    if (text.length > maxLength) {
        return text.substr(0, maxLength) + '...'
    }
    return text;
}

export const usePagination = (data, itemsPerPage, search) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data?.length / itemsPerPage);

    const currentData = () => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        if (search !== "") {
            return data;

        } else {
            return data?.slice(begin, end);
        }
    }

    const next = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    }

    const prev = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    }

    const jump = (page) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
    }

    return { next, prev, jump, currentData, currentPage, maxPage };
}
export const emptyDropDown = (selectElement) => {
    var i, L = selectElement?.options?.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}


export const COURSE_SECTION_TYPE = [
    {
        id: 1,
        name: 'Video'
    },
    {
        id: 2,
        name: 'Quiz'
    }
]

export const COURSE_TYPE_LIST = [
    { id: 1, name: 'Normal Course' },
    { id: 2, name: 'Dual Course' }
];

export const getFileType = (fileName) => {
    let splitArr = fileName?.split('.');

    let fileType = splitArr[splitArr?.length - 1];

    return fileType;
}


export const CLOUD_FRONT_URL = 'https://d3oaompef0i2u8.cloudfront.net/videos/'
