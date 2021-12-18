import Button from '../../components/button'
import Col from '../../components/col'
import Container from '../../components/container'
import Heading from '../../components/heading'
import Layout from '../../components/layout'
import Paragraph from '../../components/paragraph'
import PersonCard from'../../components/personcard'
import Row from '../../components/row'
import StoryArt from '../../components/storyart'
import { convert_duration_to_hours_minutes } from '../../lib/utilities'
import { getAllMovieSlugs, getMovieBySlug } from '../../lib/api'

// The Waterfall

// 1. Build array of slugs/paths
export async function getStaticPaths() {
	const movieSlugs = await getAllMovieSlugs()

	const paths = movieSlugs.edges.map(edge => {
		const { slug } = edge.node
		return {
			params: {
				id: slug
			}
		}
	})
	return {
		paths,
		fallback: false
	}
}
// 2. For each slug/path, fetch the information about each movie
export async function getStaticProps({ params }) {
	const movieData = await getMovieBySlug(params.id)

	return {
		props : {
		     movieData
		}
	}
}
// 3. Pass the movie data into the singleMovie component. Next.js will do this for each movie.
const singleMovie = ({ movieData }) => {
     // destructure items here
     const {
		 title, 
		 featuredImage, 
		 titleInformation, 
		 genres, 
		 ratings
		 } = movieData
	 const {duration, publicationDate, youtubeUrl, storyArt, storyLogo, director, castMembers} = titleInformation
	//const ratingsString = ratings.edges.map((rating) => {
		//return rating.node.name
	//})
	const durationString = convert_duration_to_hours_minutes(duration)
     return <Layout>
          {storyArt &&
		  	<StoryArt storyArt={storyArt} youtubeUrl={youtubeUrl}/>
		  } 
		<Container>
			<Row>
				<Col xs="12" sm="12" md="6">
					<Heading type="h1">{title}</Heading>
					<Paragraph>{publicationDate} &#8226; {durationString}</Paragraph>
				</Col>
				<Col xs="12" sm="12" md="6">
					{genres.edges.map((genre, index) => {
						const {name} = genre.node
						return <Button 
							key={index} 
							label={name} 
							inverted
						/>						
					})}
				</Col>
			</Row>
			{castMembers &&
				<>
				<Heading type="h2">Cast Members</Heading>
				<Row>
					{castMembers.map((castMember, index) => {
						return <Col xs="12" sm="6">
							<PersonCard
							image={castMember.featuredImage.node}
							name={castMember.title}
							/>
						</Col>
					})}
				</Row> 
				</>
			}
			{director && <>
				<Heading type="h2">Director</Heading>
				<Row>
					<Col xs="12" sm="6">
						<PersonCard 
							image={director.featuredImage.node} 
							name={director.title}/>
					</Col>
				</Row>
			</>
		}
		</Container>
	</Layout>
}

export default singleMovie