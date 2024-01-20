import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from "@mui/material"

import LoadingButton from "@mui/lab/LoadingButton"
import { useCreateUser } from "@/data/user/useCreateUser/index"
import { useState, useMemo } from "react"
import { useReadTasks } from "@/data/task/useReadTasks"
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react'

const Tasks = () => {
  const { tasks, readTasks } = useReadTasks()
  const apiError = null
  useEffect(() => {
    readTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Card sx={{ m: 5 }} data-testid="Tasks">
      <CardHeader
        title="タスク"
        action={
          <IconButton onClick={() => { }}>
            <AddIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        <pre>{JSON.stringify(tasks, null, 4)}</pre>
        {/* {!!apiError && (
          <Typography sx={{ p: 1 }} color="error" data-testid="TasksApiErr">{apiError}</Typography>
        )} */}
      </CardContent>
    </Card>
  )
}
export default Tasks
