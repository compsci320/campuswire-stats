// Importing necessary components and icons from libraries
import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import { Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

// Define the RecentPostsCard component
export const RecentPostsCard = (props: { difference: any; positive: boolean | undefined; sx: any; value: any; }) => {
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
              Posts made in the Past Day
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
        </Stack>
        {/* Conditionally rendering the difference section */}
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
              {/* Displaying an up or down arrow icon based on the positive state */}
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              {/* Displaying the difference in percentage with appropriate color */}
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

// Defining PropTypes for the component for type checking
RecentPostsCard.prototypes = {
  difference: PropTypes.number, // PropType for difference: a number
  positive: PropTypes.bool,      // PropType for positive: a boolean
  sx: PropTypes.object,          // PropType for sx: an object for styling
  value: PropTypes.string.isRequired // PropType for value: a required string
};
