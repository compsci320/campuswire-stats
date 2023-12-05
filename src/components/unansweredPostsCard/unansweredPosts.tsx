import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import { Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const UnansweredPostsCard = (props: { hours: any; sx: any; value: any; }) => {
  const { hours, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
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
          <Stack
            alignItems="flex-start"
            direction="row"
            spacing={0.5}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="flex-start"
              direction="row"
              spacing={0.5}
            >
            </Stack>
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

UnansweredPostsCard.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};