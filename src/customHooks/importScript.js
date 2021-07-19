/*export const appendScript  = (scriptToAppend,callback) => {
/!*    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    document.body.appendChild(script);*!/

    let s,
        r,
        t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = scriptToAppend;
    s.onload = s.onreadystatechange = function() {
        //console.log( this.readyState ); //uncomment this line to see which ready states are called.
        // eslint-disable-next-line
        if ( !r && (!this.readyState || this.readyState == 'complete') )
        {
            r = true;
            callback();
        }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}*/


/*function loadScript(src) {
    return new Promise(function (resolve, reject) {
        let s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.header.appendChild(s);
    });
}*/

import {useEffect} from "react";

const useScript = url => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};
export default useScript
