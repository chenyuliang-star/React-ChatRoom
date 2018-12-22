

export function getRedirectTo (type, img){
    let redirectPath = '';
    redirectPath = ( type === 'boss' ? '/boss' : '/genius' );
    if (!img) redirectPath +='info';
    return redirectPath;
}