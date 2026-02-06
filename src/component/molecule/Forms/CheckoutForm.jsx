import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  ElementsConsumer,
  CardElement
} from '@stripe/react-stripe-js';

const CheckoutForm =({stripe,elements})=>{
    const [error, setError]=useState('')
        // const stripe = useStripe();
    // const elements = useElements();

    const handleSubmit =  () => {
            if (!stripe || !elements) {
                return;
            }
    
            const cardElement = elements.getElement(PaymentElement);
    
            try {
                // const { error, setupIntent } = await stripe.confirmCardSetup('sk_test_51Ikt7GIVKG0Cn57wk8U2xsh9cqjcG7aZzaN615hRoKZ5RwZu6PGrDxJuIr8SR0NsZDaei1GX9gGRE0ZH7kR4G6S700wWnYQXot',{
                //     payment_method: {
                //         card: cardElement,
                //         billing_details: {
                //            
                //             // Include any additional billing details here
                //         },
                //     },
                // });
    
                stripe
                    .createPaymentMethod({
                        type: 'card',
                        card: cardElement,
                        billing_details: {
                            // name: data?.first_name + ' ' + data?.last_name,
                            // email: data?.email
                        },
                    }).then((result) => {
                        console.log("llklklk", result)
                        if (result.error) {
                            setError(error.message);
                        } else {
    
                        }
    
                    })
                // .catch(error){
                //     setError(error.message);
                // }
    
                if (error) {
                    setError(error.message);
                    return;
                }
    
                // console.log('SetupIntent:', setupIntent);
                // Handle successful card addition
            } catch (error) {
                setError(error.message);
                console.log("oiooioio", error)
            }
    }

    return(
        <form >
        <PaymentElement />
        <button onClick={handleSubmit} type="button" disabled={!stripe}>
          Pay
        </button>
        {error && <div>{error}</div>}
      </form>
    )
}

export default CheckoutForm