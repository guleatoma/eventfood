import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {myResource: 'undefined'};
    }

    componentDidMount() {
        var self = this;
        var myResourcePromise = new Promise(function(resolve, reject){
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "./api/myresource", true);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(xhttp.responseText);
                }
            };
            xhttp.send();
        });

        myResourcePromise.then(function(response){
            self.setState({myResource: response});
        });
    }

    render() {
        return (
            <p>{this.state.myResource}</p>
        )
    }
}

export default App;