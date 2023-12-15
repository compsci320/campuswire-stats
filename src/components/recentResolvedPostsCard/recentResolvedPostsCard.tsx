// Importing required modules and components
import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import { Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

// Define the RecentResolvedPostsCard component
export const RecentResolvedPostsCard = (props: { difference: any; positive: boolean | undefined; sx: any; value: any; }) => {
  // Destructuring props to extract the required values
  const { difference, positive = false, sx, value } = props;

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
              Posts Resolved in the Past Day
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
        </Stack>
        {/* Conditionally rendering the difference section if 'difference' is present */}
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              {/* Displaying an arrow icon indicating the trend of change */}
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              {/* Displaying the percentage difference with appropriate color coding */}
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Since yesterday
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

// Defining PropTypes for type checking the props of the component
RecentResolvedPostsCard.prototypes = {
  difference: PropTypes.number, // A number indicating the difference in resolved posts
  positive: PropTypes.bool,      // A boolean indicating whether the difference is positive
  sx: PropTypes.object,          // Styling object for customizing the card's appearance
  value: PropTypes.string.isRequired // The number of posts resolved (required prop)
};
