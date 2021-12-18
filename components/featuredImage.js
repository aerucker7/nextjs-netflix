import Image from 'next/image'

const FeaturedImage = ( { data } ) => {
    const { node } = data
    const { sourceUrl, mediaDetails, altText } = node
    const { width, height } = mediaDetails
    
    return <Image
        src={sourceUrl}
        width={width}
        height={height}
        altText={altText}
        />
}

export default FeaturedImage