const dateConverter = (isoDateString) => { 
    const date = new Date(isoDateString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
}

export default dateConverter;