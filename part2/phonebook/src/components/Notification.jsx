const Notification = ({ message }) => {
    if (message === null) return null

    return (
        <div className={message.type !== 'error' ? 'success' : 'error'}>
            {message.msg}
        </div>
    )
}

export default Notification