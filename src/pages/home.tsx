
import { Container, Typography, Card,  CardContent, CardMedia,  Grid } from '@mui/material';
import { menuList } from "../assets/mockup"
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <Typography sx={{ textAlign: 'center', color: '#fff', fontSize: '40px', padding: '20px 0' }}>
        Lost Judgement App
      </Typography>

      <Grid container spacing={2}>
        {/* 
        menuList = [    
          { 
            id: "material", 
            title: "Material",
            description:"List of Materials with location, price and checklist", 
            route: "/material", 
            img: robotics },    
       */}
        {menuList.map((row) => (
          <Grid item xs={12} md={4} key={row.id}>
            <NavLink to={row.route} style={{textDecoration: 'none'}}>
              <Card sx={{ background: "#35dfdf" }}>
                <CardMedia
                  component="img"
                  image={row.img}
                  height="200"
                  alt={row.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {row.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {row.description}
                  </Typography>
                </CardContent>
              </Card>
            </NavLink>
          </Grid>
        ))}

      </Grid>

    </Container>
  );
}
