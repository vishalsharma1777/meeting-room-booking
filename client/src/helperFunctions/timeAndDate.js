export const dateFinder = (isoDateString) => { 
    const date = new Date(isoDateString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
}

export const timeFinder = (isoDateString) => { 
    const date = new Date(isoDateString);
    const options = {
        hour: "numeric",
        minute: "numeric",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
}
