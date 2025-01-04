import React from "react";
import Card from "@mui/joy/Card";
import Box from '@mui/joy/Box';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Sheet from '@mui/joy/Sheet';
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";

const RestaurantDetailsCard = ({ data }) => {
    return (
            <div className="container-sm " style={{ marginTop: '6rem', marginBottom: '2rem' }}>
                <Box
                    sx={{
                        width: '100%',
                        position: 'relative',
                        overflow: { xs: 'auto', sm: 'initial' },
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            display: 'block',
                            width: '1px',
                            left: '500px',
                            top: '-24px',
                            bottom: '-24px',
                        }}
                    />
                    <Card
                        orientation="horizontal"
                        sx={{
                            width: '100%',
                            flexWrap: 'wrap',
                            [`& > *`]: {
                                '--stack-point': '800px',
                                minWidth:
                                    'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
                            },
                            overflow: 'auto',
                            resize: 'horizontal',
                        }}
                    >
                        <AspectRatio flex ratio="16/5" maxHeight={500} sx={{ minWidth: 500 }}>
                            <img
                                src={data.imageUrl || "https://via.placeholder.com/300x200"}
                                alt={data.restaurantName}
                                srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&dpr=2 2x"
                                loading="lazy"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </AspectRatio>
                        <CardContent>
                            <Typography sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
                                {data.restaurantName}
                            </Typography>
                            <Typography
                                level="body-md"
                                startDecorator={<LocationOnRoundedIcon />}
                                textColor="text.tertiary"
                                sx={{ fontWeight: 'medium', fontSize: 'lg' }}
                            >
                                {data.location}
                            </Typography>
                            <Sheet
                                sx={{
                                    bgcolor: 'background.level1',
                                    borderRadius: 'sm',
                                    p: 2,
                                    my: 2,
                                    display: 'flex',
                                    gap: 2,
                                    '& > div': { flex: 1 },
                                }}
                            >
                                <div>
                                    <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
                                        <i className="fa-solid fa-phone"></i> Celular
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'medium', fontSize: 'lg' }}>{data.phoneNumber}</Typography>
                                </div>
                                <div>
                                    <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
                                        <i className="fa-solid fa-star"></i> Rating
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'medium', fontSize: 'lg' }}>{data.averageRating}</Typography>
                                </div>
                                <div>
                                    <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
                                        <i className="fa-solid fa-circle"></i> Abierto
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'medium', fontSize: 'lg' }}>Cierra a las 3 am</Typography>
                                </div>
                            </Sheet>
                        </CardContent>
                        <CardOverflow
                            variant="soft"
                            color="primary"
                            sx={{
                                px: 0.4,
                                writingMode: 'vertical-rl',
                                justifyContent: 'center',
                                fontSize: 'sm',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                borderLeft: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            {data.categoryName}
                        </CardOverflow>
                    </Card>
                </Box>
            </div>
    );
};

export default RestaurantDetailsCard;
