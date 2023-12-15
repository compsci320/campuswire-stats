// Importing required modules and components
import PropTypes from 'prop-types';
import { Card, CardContent, Stack, Typography } from '@mui/material';

// Define the UnansweredPostsCard component with props for hours, sx, and value
export const UnansweredPostsCard = (props: { hours: any; sx: any; value: any; }) => {
  // Destructuring props to extract the required values
  const { hours, sx, value } = props;

  return (
    // Render a Card component with custom styles (sx)
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          {/* Stack for displaying the title and value */}
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Unanswered Posts
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
        </Stack>
        {/* Display additional information about the most recent post */}
        <Stack
          alignItems="flex-start"
          direction="row"
          spacing={0.5}
          sx={{ mt: 2 }}
        >
          <Typography
            color="text.secondary"
            variant="caption"
          >
            Most recent posted {hours} hours ago
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Defining PropTypes for type checking the props of the component
UnansweredPostsCard.prototypes = {
  hours: PropTypes.number, // PropType for hours: a number representing hours since the last post
  sx: PropTypes.object,    // PropType for sx: an object for styling
  value: PropTypes.string.isRequired // PropType for value: a required string representing the number of unanswered posts
};
