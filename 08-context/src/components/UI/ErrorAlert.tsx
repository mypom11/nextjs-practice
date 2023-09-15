import classes from './ErrorAlert.module.css'

interface errorAlertProps {
  children: React.ReactNode
}

const ErrorAlert = ({ children }: errorAlertProps) => {
  return <div className={classes.alert}>{children}</div>
}

export default ErrorAlert
