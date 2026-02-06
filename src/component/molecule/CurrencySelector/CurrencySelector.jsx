import { Box, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextIconButtonComponent, TextInputComponent } from "../../atom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import DropDownComponent from "../../atom/Inputs/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { getText } from "../../../core/Constant";
import _ from "lodash"

const CurrencySelector = ({
  onClickAdd = () => { },
}) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [currency, setCurrency] = useState(0);
  const [isCurrencyValid, setCurrencyValid] = useState(false);
  const [isCurrencyError, setCurrencyError] = useState(false);
  const [currencyData, setCurrencyData] = useState(null);

  const [amount, setAmount] = useState(null);
  const [isAmountValid, setAmountValid] = useState(false);
  const [isAmountError, setAmountError] = useState(false);

  useEffect(() => {
    dispatch(Actions.auth.getSystemCurrency())
  }, []);

  const systemCurrencyList = useSelector((state => state.auth.get('systemCurrency')));

  useEffect(() => {
    setList(systemCurrencyList);
    if (systemCurrencyList && systemCurrencyList?.length && systemCurrencyList?.length > 0) {
      // setCurrency(systemCurrencyList[0]?.id)
    }
  }, [systemCurrencyList]);

  const onChangeAmount = (e) => {
    const text = getText(e);
    setAmount(text);
    setAmountError(false);
    const isValid = text > 0;
    setAmountValid(isValid);
  }

  const onChangeCurrency = (e) => {
    const value = getText(e);
    setCurrencyError(false);
    setCurrencyValid(true);
    setCurrency(value);
    const data = _.filter(list, i => i.id == value);
    setCurrencyData(data[0]);
  };

  const onAdd = () => {
    if (isAmountValid && isCurrencyValid) {
      onClickAdd({ amount, currencyData, currency });
      onClean();
    } else {
      if (!isAmountValid) {
        setAmountError(true);
      }
      if (!isCurrencyValid) {
        setCurrencyError(true);
      }
    }

  }

  const onClean = () => {
    setAmount(0);
    setCurrency(null);
    setCurrencyData(null);

    setAmountError(false);
    setAmountValid(false);
    setCurrencyValid(false);
    setCurrencyError(false);
  }


  return (
    <Grid
      container
      p={2}
      justifyContent={"space-between"}
      sx={{
        backgroundColor: "#FAF5FE",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      alignItems={"center"}
    >
      <Grid item xs={4}>
        <DropDownComponent
          isShowZero={false}
          dropdownLabel="Currency"
          backgroundColor={"#fff"}
          onchange={onChangeCurrency}
          selectedValue={currency}
          isError={isCurrencyError}
          error={"Selected currency not valid"}
          list={list}
        />
      </Grid>
      <Grid item xs={4}>
        <TextInputComponent
          label={"Amount"}
          placeholder="Amount"
          backgroundColor="#fff"
          borderStyle="solid"
          value={amount}
          isError={isAmountError}
          error="Please enter a valid amount"
          onchange={onChangeAmount}
          type={"number"}
        />
      </Grid>
      <Grid item xs={2}>
        <Box pt={4}>
          <TextButtonComponet
            text={"Add"}
            onButtonClick={onAdd}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CurrencySelector;
