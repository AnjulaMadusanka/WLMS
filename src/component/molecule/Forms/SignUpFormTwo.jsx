import { Box, Typography, DialogActions, DialogContent, Alert, Stack, Grid } from "@mui/material"
import TextInputComponent from "../../atom/Inputs/TextInput"
import TextButtonComponet from "../../atom/Buttons/TextButton"
import { useState, useImperativeHandle, forwardRef, useEffect } from "react"
import { MINIMUM_PASSWORD_CHARACTERS, USER_ROLE, EMAIL_REGEX, getText, getDeviceId, PASSWORD_REGEX, onGetCurrencySymble } from "../../../core/Constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../../core/modules/Actions";
import CardValidator from 'card-validator';
import _ from "lodash";
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
    CardElement,
    ElementsConsumer,
} from '@stripe/react-stripe-js';


// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from "./CheckoutForm";
// const stripePromise = loadStripe('pk_test_51Ikt7GIVKG0Cn57w0hqBbDwnaNyCgFFehq0hQyFIitDExWLC71EfFp8SvQqxQwaR4GTzhT7Goc0JITe2kea347aH00b2IXUG4u');



const SignUpFormTwo = forwardRef(({ item = {}, course_id, onClose = () => { }, isRegistered = 0, courseType, onUpdateValue = () => { }, symbol = '' }, ref) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [cardNumber, setCardNumber] = useState('');
    // const [isValidCardNumber, setIsValidCardNumber] = useState(false);
    // const [cardNumberError, setCardNumberError] = useState(false);

    const [cvv, setCvv] = useState('');
    // const [isValidCvv, setIsValidCvv] = useState(false);
    // const [cvvError, setCvvError] = useState(false);
    const selectedCurrency = localStorage.getItem('GlobalCurrency');

    const [times, setTime] = useState(0);
    // const [show, setShow] = useState(false);

    // const [date, setDate] = useState('');
    // const [isValidDate, setIsValidDate] = useState(false);
    // const [dateError, setDateError] = useState(false);
    const [code, setcode] = useState({ name: 'CVV', size: 3 });
    // const [month, setMonth] = useState('');
    // const [year, setYear] = useState('');
    // const [cardType, setCardType] = useState('');

    const signUpresponse = useSelector(state => state.auth.get("signUpresponse"));
    const [statusIndex, setStatusIndex] = useState(0);

    const [errMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const [promCode, setPromoCode] = useState('');
    const [isPromoError, setIsPromoError] = useState(false);
    const [promoErrorMessage, setPromoErrorMessage] = useState('');
    const [discount, setDiscountPrice] = useState('');

    const promoCodeDiscount = useSelector(state => state.auth.get('promoCodeDiscount'));


    // const [symbole, setSymbole]=useState(onGetCurrencySymble('GBP'));

    useEffect(() => {
        if (promoCodeDiscount?.status_code == 0) {
            setIsPromoError(true);
            setPromoErrorMessage(promoCodeDiscount?.message);
            onUpdateValue(courseType, 0)
        }
        if (promoCodeDiscount?.discount_price) {
            setIsPromoError(false);
            setPromoErrorMessage('');
            setDiscountPrice(promoCodeDiscount?.discount_price);
            onUpdateValue(promoCodeDiscount?.discount_price, 1)
        }
    }, [promoCodeDiscount])

    useEffect(() => {
        if (promCode && promCode?.length > 5) {
            onPromoVerify(promCode)
        }
    }, [promCode, courseType]);

    const onPromoChange = (e) => {
        const text = getText(e);
        setPromoCode(text)
        // onPromoVerify(text)

    }

    const onPromoVerify = _.debounce((promo) => {
        dispatch(Actions.auth.getPromoCodeDiscount({ promo_code: promo, course_id, currency_id: selectedCurrency, course_type: courseType }));
        // setSymbole(onGetCurrencySymble())
    }, 2500)

    useEffect(() => {
        if (!signUpresponse?.status && signUpresponse?.status_code == 0) {
            // setCardNumberError(true);
            setErrorMessage(signUpresponse?.message)
           
        }
        else if (signUpresponse?.status) {
            setErrorMessage('')
            setMessage(signUpresponse?.message)
            _.delay(() => {
                onClose();
            }, 1000)
        }
        setStatusIndex(signUpresponse?.status_code)
       
    }, [signUpresponse])


    // const onChangeCvv = (e) => {
    //     const text = getText(e)
    //     const validation = CardValidator.cvv(text.toString().trim(), code.size);
    //     let isValid = validation['isValid'];
    //     setCvv(text);
    //     setIsValidCvv(isValid);
    //     setCvvError(false);
    // };

    // const onChangeDate = (e) => {
    //     const text = getText(e)
    //     const data = onExpDate(text);
    //     const validation = CardValidator.expirationDate(data.toString().trim());
    //     let { isValid, month, year } = validation;
    //     if (isValid) {
    //         if (year.length === 2) {
    //             year = 20 + year;
    //         }
    //         setMonth(month);
    //         setYear(year);
    //     }
    //     setIsValidDate(isValid);
    //     setDate(data);
    //     setDateError(false);
    // }

    // const onExpDate = (value) => {
    //     let date = value;
    //     let time = times;
    //     const stringArray = value.trim().split('');
    //     if (stringArray.length === 1 && parseInt(stringArray[0]) > 1) {
    //         date = '0' + stringArray[0] + '/';
    //     }
    //     if (stringArray.length === 2 && time === 0) {
    //         if (
    //             time === 0 &&
    //             parseInt(stringArray[0]) >= 1 &&
    //             parseInt(stringArray[1] > 2)
    //         ) {
    //             date = stringArray[0] + '2/';
    //         } else {
    //             date = date + '/';
    //         }
    //         time = stringArray.length;
    //         setTime(time);
    //         return date;
    //     }
    //     if (stringArray.length === 2 && time === 2) {
    //         date = stringArray[0] + stringArray[1];
    //         time = 0;
    //     }
    //     setTime(time);
    //     return date;
    // };


    // const onChangeCardNumber = (e) => {
    //     let text = getText(e);
    //     let number = text;
    //     text = text.trim();
    //     if (text && text.length > 0) {
    //         text = text.replace(/[&\/\\#,_= +()$~%.'":*?<>{}-]/g, '');
    //     }

    //     const validation = CardValidator.number(text.trim());
    //     let isValid = validation['isValid'] //|| validation['isPotentiallyValid'];
    //     const code = _.get(validation, 'card.code', null);
    //     setCardType(_.get(validation, 'card.type', ''))
    //     if (!_.isNull(code)) {
    //         setcode(code);
    //         if (cvv.length > 0) {
    //             const validationCVV = CardValidator.cvv(
    //                 cvv.toString().trim(),
    //                 code.size,
    //             );
    //             setIsValidCvv(validationCVV['isValid'])
    //         }
    //     }
    //     if (text.length > 3 && text.length % 4 == 0) {
    //         number = text.match(/\d{4}/g);
    //         number = number?.join(" ");
    //     }
    //     setCardNumber(number);
    //     setIsValidCardNumber(isValid);
    //     setCardNumberError(false);
    //     setErrorMessage("Please add valid card number")
    // };

    useImperativeHandle(ref, () => ({
        onPress(price, courseType) {
            onSignUp(price, courseType);
        }
    }))


    const onSignUp = async (price, courseType) => {
        const device_id = await getDeviceId();
        const data = {
            device_id,
            course_id,
            is_free: 0,
            type: courseType,
            ...item,
            promo_code: promCode,
            currency_id: selectedCurrency
        };
        handleSubmit(data, isRegistered)
        // if (isRegistered) {
        //     handleSubmit()
        //      dispatch(Actions.course.registerNewCourseByUser(data))
        // } else {
        //     dispatch(Actions.auth.signUp(data));
        // }
        // const device_id = await getDeviceId();
        // if (isValidCardNumber && isValidCvv && isValidDate) {
        //     const data = {
        //         device_id,
        //         course_id,
        //         cvc: cvv,
        //         card_no: cardNumber.split(" ").join(""),
        //         exp_month: month,
        //         exp_year: year,
        //         is_free: 0,
        //         type: courseType,
        //         ...item,
        //         promo_code: promCode,
        //         currency_id: selectedCurrency
        //     };
        //     if (isRegistered) {
        //         handleSubmit()
        //          dispatch(Actions.course.registerNewCourseByUser(data))
        //     } else {
        //         dispatch(Actions.auth.signUp(data));
        //     }
        // } else {
        //     if (!isValidCardNumber) {
        //         setCardNumberError(true)
        //     }
        //     if (!isValidCvv) {
        //         setCvvError(true)
        //     }
        //     if (!isValidDate) {
        //         setDateError(true)
        //     }
        // }
    }

    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (data, isRegistered) => {
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            stripe
                .createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: data?.first_name + ' ' + data?.last_name,
                        email: data?.email
                    },
                }).then((result) => {
                   
                    if (result.error) {
                        setError(result.error?.message);
                    } else {
                        const payment_method_id = _.get(result, 'paymentMethod.id')
                        if (isRegistered) {
                            dispatch(Actions.course.registerNewCourseByUser({ ...data, payment_method_id }))
                        } else {
                            dispatch(Actions.auth.signUp({ ...data, payment_method_id }));
                        }
                    }
                })

            if (error) {
                setError(error.message);
                return;
            }
        } catch (error) {
            setError(error.message);
            
        }
    };

    return (
        <>
            {statusIndex == 1 ? <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">{message}</Alert>
            </Stack> : null}
            <p className="signup-title">Enter your card details to purchase</p>
            <Grid alignItems={'center'} container>
                <Grid item>
                    <TextInputComponent
                        label={"Promo Code"}
                        placeholder="Enter promo code"
                        value={promCode}
                        onchange={onPromoChange}
                        type="text"
                    />
                </Grid>
                {promCode?.length > 5 ? <Grid xs={6} item>
                    <p id="input-text" style={{ color: 'black', fontWeight: 800 }} className="input-text-title">{isPromoError ? '' : `New purchase price :`}<span style={{ color: '#8080f1', fontWeight: 800 }} className="input-text-title"> {isPromoError ? promoErrorMessage : symbol + discount} </span></p>
                </Grid> : <p id="input-text" className="input-text"><span style={{ color: '#8080f1', fontWeight: 800 }} className="input-text-title"> {`Promo code should have minimum 5 characters`} </span></p>}
            </Grid>

            {/* <Elements stripe={stripePromise} options={{
                 mode: 'payment',
                 amount: 60,
                 currency: 'usd',
            }}>
                <ElementsConsumer>
                    {({ stripe, elements }) => (
                        <CheckoutForm stripe={stripe} elements={elements} />
                    )}
                </ElementsConsumer>
            

            </Elements> */}
            <form >
                <CardElement
                    id="my-card"
                    // onChange={handleSubmit}

                    options={{
                        iconStyle: 'solid',
                        style: {
                            base: {
                                iconColor: '#c4f0ff',
                                color: '#000000',
                                fontSize: '16px',
                            },
                            invalid: {
                                iconColor: '#FFC7EE',
                                color: '#FFC7EE',
                            },
                        },
                    }}
                />

                {/* {error && <div>{error}</div>} */}
            </form>

            {error && <div style={{ fontSize: 18, fontFamily: 'Monsterrat', color: 'red' }}>{error}</div>}
            {errMessage && <div style={{ fontSize: 18, fontFamily: 'Monsterrat', color: 'red' }}>{errMessage}</div>}
            {/* <TextInputComponent
                label={"Card Number"}
                placeholder="Eg: 1234 XXXX XXXX XXXX"
                value={cardNumber}
                onchange={onChangeCardNumber}
                error={errMessage}
                isError={cardNumberError}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ flexGrow: 1, marginRight: 2 }}>
                    <TextInputComponent
                        label={"Exp Date"}
                        placeholder="MM/YY"
                        value={date}
                        onchange={onChangeDate}
                        error="Please add valid date"
                        isError={dateError}
                    />

                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <TextInputComponent
                        label={"CVV"}
                        placeholder="XXX"
                        value={cvv}
                        onchange={onChangeCvv}
                        error="Please add valid cvv"
                        isError={cvvError}
                    />
                </Box>
            </Box> */}
        </>
    )
})

export default SignUpFormTwo;