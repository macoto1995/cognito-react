import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form'


    
async function signUp(email: string, password: string) {
  try {
      const { user } = await Auth.signUp({
          username: email,
          password,
          attributes: {
            email,          // optional
            // phone_number,   // optional - E.164 number convention
            // other custom attributes 
        },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
              enabled: true,
          }
      });
      alert(JSON.stringify({user}));
  } catch (error) {
      alert(JSON.stringify(error));
  }
}


async function resendConfirmationCode(username: string) {
  try {
      await Auth.resendSignUp(username);
      alert(JSON.stringify('code resent successfully'));
  } catch (err) {
      alert(JSON.stringify(err));
  }
}

async function confirmSignUp(username: string, code: string) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
      alert(JSON.stringify(error));
  }
}

const SignUpForm = () => {
  const { register, handleSubmit } = useForm<{email: string, password: string}>()

  return (
    <form onSubmit={handleSubmit(({email, password}) => signUp(email, password))}>
      <label htmlFor="email">Email</label>
      <input {...register('email')} />
      <br />
      <label htmlFor="password">Password</label>
      <input {...register('password')} type='password'/>
      <br />
      <button type='submit'>Sign Up</button>
    </form>
  )
}


const ResendConfirmationCodeForm = () => {
  const { register, handleSubmit } = useForm<{email: string}>()

  return (
    <form onSubmit={handleSubmit(({email}) => resendConfirmationCode(email))}>
      <label htmlFor="email">Email</label>
      <input {...register('email')} />
      <br />
      <br />
      <button type='submit'>
        Resend Confirmation Code
      </button>
    </form>
  )
}

const ConfirmSignUpForm = () => {
  const { register, handleSubmit } = useForm<{email: string, code: string}>()

  return(
    <form onSubmit={handleSubmit(({ email, code }) => confirmSignUp(email, code))}>
      <label htmlFor="email">Email</label>
      <input {...register('email')} />
      <br />
      <label htmlFor="code">Code</label>
      <input {...register('code')}  />
      <br />
      <button type='submit'>Confirm</button>
    </form>

  )
}


export const Login = () => {
  return (
    <>
      <SignUpForm />
      <br />
      <ResendConfirmationCodeForm />
      <br />
      <ConfirmSignUpForm />
    </>
  )
  }