//Handle main function "performAction"
function performAction(e){
    e.preventDefault()

    //get user i/p's
    const location = document.getElementById('location').value
    const date =  document.getElementById('date').value
    
postData('/add', {
    location: location, date: date }).then(function(data)
    {
        //show weather info 
        document.getElementById('temp').innerHTML = data.weatherData[0].temp
        document.getElementById('pic').src = data.imageData[0].previewURL
    })
}

//Function to post data from app to our local server 
const postData = async ( url = '', data ={}) => {
    console.log('postData data',data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type':'application/json',},
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json()
        console.log(newData)
        return newData
    }
    catch(e){
        console.log("error", e)
    }    
}

export {performAction}