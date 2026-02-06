import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { Box, Checkbox, Grid } from "@mui/material";
import {
  DatePickerComponent,
  TextInputComponent,
} from "../../../component/atom";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";
import {
  CurrencySelector,
  ViewSelectedCurrency,
} from "../../../component/molecule";
import { getText } from "../../../core/Constant";
import ShortUniqueId from "short-unique-id";
import _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const EditPromoCode = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let data = location?.state?.values;
  const [promoCode, setPromoCode] = useState(data?.promo_code);
  const [promoCodeValid, setPromoCodeValid] = useState(
    data?.promo_code.trim().length !== 0 ? true : false
  );
  const [promoCodeError, setPromoCodeError] = useState(false);
  const [startDate, setStartDate] = useState(new Date(data?.start_date));
  const [startDateError, setStartDateError] = useState(false);
  const [startDateValid, setStartDateValid] = useState(true);
  const [endDate, setEndDate] = useState(new Date(data?.end_date));
  const [endDateValid, setEndDateValid] = useState(true);
  const [endDateError, setEndDateError] = useState(false);
  const [precentage, setPrecentage] = useState(
    data?.promo_code_discount[0]?.discount
  );
  const [precentageValid, setPrecentageValid] = useState(false);
  const [precentageError, setPrecentageError] = useState(false);
  const [checked, setChecked] = useState(data?.is_one_time == 1 ? true : false);
  const [promoCodeType, setPromoCodeType] = useState(data?.discount_type);
  const [listAmount, setListAmount] = useState([]);
  const [listAmountError, setListAmountError] = useState(false);
  const promoCodeTypeList = [
    { promoTypeId: 1, promoType: "Precentage" },
    { promoTypeId: 2, promoType: "As an amount" },
  ];
  const uid = new ShortUniqueId({ length: 8 });

  useEffect(() => {
    let initialArr = data?.promo_code_discount;
    let sortedArr = [];
    if (initialArr.length == 1 && initialArr[0]?.currency == null) {
      setPrecentage(initialArr[0]?.discount);
    } else {
      sortedArr = initialArr?.map((item, index) => {
        return {
          id: index + 1,
          amount: item?.discount,
          currency: item?.currency?.currency,
          currency_name: item?.currency?.currency_name,
          isRemoved: false
        };
      });
    }

    setListAmount(sortedArr);
  }, []);

  const handleChangeDropdown = async (event) => {
    const value = getText(event);
    setPromoCodeType(value);
    console.log(value);
  };
  const handleOnChangeGenarate = (e) => {
    const value = getText(e);
    if (value.trim().length > 5 && value.trim().length < 8) {
      setPromoCodeError(false);
      setPromoCodeValid(true);
      setPromoCode(value);
    } else {
      setPromoCodeError(true);
      setPromoCodeValid(false);
      setPromoCode(value);
    }
  };
  const handleOnChangeStartDate = (date) => {
    setStartDate(date);
    setStartDateValid(true);
    setStartDateError(false);
    const sDate = new Date(date.setDate(new Date(date).getDate() + 1));
    if(new Date(date).getTime() > new Date(endDate).getTime()){
      handleOnChangeEndDate(new Date(sDate.setDate(new Date(date).getDate() + 1)));
    }
  };
  const handleOnChangeEndDate = (date) => {
    setEndDate(date);
    setEndDateValid(true);
    setEndDateError(false);
  };
  const handleOnChangePercentage = (e) => {
    const value = getText(e);
    setPrecentageError(false);
    setPrecentageValid(true);
    setPrecentage(value);
  };

  const handleOnChangeOneTime = (e) => {
    setChecked(e?.target?.checked);
    console.log(e?.target?.checked);
  };

  const onClickGenarate = () => {
    setPromoCode(uid.rnd());
    setPromoCodeError(false);
    setPromoCodeValid(true);
  };

  const handleSubmit = async (event) => {
    console.log(listAmount);
    let list = _.map(listAmount, (item, i) => {
      return { ...{ amount: item?.amount, currency_id: item?.id } };
    });
    let precentageValue = [{ amount: precentage, currency_id: 0 }];
    let startDateObj = moment(startDate);
    let sdate = startDateObj.format("YYYY-MM-DD");
    let endDateObj = moment(endDate);
    let edate = endDateObj.format("YYYY-MM-DD");
    if (
      promoCodeValid &&
      startDateValid &&
      endDateValid &&
      ((promoCodeType == 1 && precentageValid) || listAmount.length > 0)
    ) {
      dispatch(
        Actions.promoCode.updatePromo({
          id: data?.id,
          promo_code: promoCode,
          start_date: sdate,
          expiration_date: edate,
          discount_type: promoCodeType, //1 - percentage / 2 - specific amount
          is_one_time: checked ? 1 : 0,
          price: promoCodeType !== 1 ? list : precentageValue,
        })
      );
    } else {
      if (!promoCodeValid) {
        setPromoCodeError(true);
      }
      if (!startDateValid) {
        setStartDateError(true);
      }
      if (!endDateValid) {
        setEndDateError(true);
      }
      if (promoCodeType == 1 && !precentageValid) {
        setPrecentageError(true);
      }
      if (promoCodeType == 2 && listAmount.length == 0) {
        setListAmountError(true);
      }
    }
  };

  const onAddCurrency = ({ amount, currencyData, currency }) => {
    const index = _.findIndex(listAmount, (i) => i?.id == currency);
    let list = listAmount;
    if (index > -1) {
      list = _.map(listAmount, (item, i) => {
        if (i == index) {
          const isRemoved = item?.isRemoved;
          return { amount, ...currencyData, isRemoved };
        }
        return item;
      });
    } else {
      list = [...listAmount, { amount, ...currencyData, isRemoved: true }];
    }
    setListAmount(list);
    setListAmountError(false);
  };

  const onClickRemoveAmountItem = (item) => {
    const list = _.filter(listAmount, (value) => {
      return item?.id != value?.id;
    });
    setListAmount(list);
  };

  return (
    <Box className="main-screen-container">
      <Grid container>
        <Grid item>
          <HeadingComponent
            text={"Edit Promo Code"}
            fontweigth={600}
            size={40}
            fontfamily={"Montserrat"}
            backNavigation={true}
          />
        </Grid>
      </Grid>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Grid container alignItems={"center"}>
              <Grid item xs={10} sm={9}>
                <TextInputComponent
                  label={"Generate The Promo Code"}
                  placeholder="Promo Code"
                  value={promoCode}
                  isError={promoCodeError}
                  error="Please enter the course name"
                  onchange={handleOnChangeGenarate}
                />
              </Grid>
              <Grid item xs={2} sm={3} mt={4}>
                <TextButtonComponet
                  text={"Generate"}
                  // width={'100%'}
                  // isDisabled={postBtnStatus}
                  onButtonClick={() => onClickGenarate()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <DatePickerComponent
              label="Start Date"
              isError={startDateError}
              error={"Select a valid date"}
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => handleOnChangeStartDate(date)}
              selectsStart
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <DatePickerComponent
              label="Expiry Date"
              selected={endDate}
              isError={endDateError}
              dateFormat="dd/MM/yyyy"
              error={"Select a valid date"}
              onChange={(date) => handleOnChangeEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Grid>

          <Grid item xs={6}>
            <DropDownComponent
              dropdownLabel="Promo Code Type"
              selectedValue={promoCodeType}
              onchange={handleChangeDropdown}
              list={promoCodeTypeList}
              isShowZero={false}
            />
          </Grid>
          {promoCodeType == 1 ? (
            <Grid item xs={6}>
              <TextInputComponent
                label={"Percentage"}
                placeholder="Percentage"
                value={precentage}
                isError={precentageError}
                error="Please enter the lecturer name"
                onchange={handleOnChangePercentage}
              />
            </Grid>
          ) : null}
        </Grid>

        {promoCodeType !== 1 ? (
          <Grid container flexDirection={"column"} mt={1} gap={1}>
            <Grid item>
              <CurrencySelector onClickAdd={onAddCurrency} />
            </Grid>
            {listAmount?.length !== 0 ? (
              <Grid item>
                <ViewSelectedCurrency
                  onClickRemove={onClickRemoveAmountItem}
                  list={listAmount}
                />
              </Grid>
            ) : null}
            {listAmountError ? (
              <p className="input-error-text">Currencies are not selected</p>
            ) : null}
          </Grid>
        ) : null}

        <Grid container alignItems={"center"} p={2}>
          <Grid item>
            <p style={{ padding: 0, margin: 0 }}>Is one time use promo code</p>
          </Grid>
          <Grid item>
            <Checkbox
              checked={checked}
              onChange={handleOnChangeOneTime}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          </Grid>
        </Grid>

        <Grid container mt={4} justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={3}>
            <TextButtonComponet
              text={"Update"}
              width={120}
              // isDisabled={postBtnStatus}
              onButtonClick={() => handleSubmit()}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditPromoCode;
