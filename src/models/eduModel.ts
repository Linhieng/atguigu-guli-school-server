import { model } from 'mongoose'
import { eduTeacherSchema, eduSubjectChildrenSchema, eduSubjectSchema, eduCoursesSchema, eduCourseCollectsSchema, eduCourseDescriptionsSchema, eduChaptersSchema, eduVideosSchema, eduCommentsSchema } from './Schema'

export const EduTeacher = model('edu_teachers', eduTeacherSchema)
export const EduSubjectChildren = model('edu_subject_children', eduSubjectChildrenSchema, 'edu_subject_children')
export const EduSubject = model('edu_subject', eduSubjectSchema)
export const EduCourse = model('edu_courses', eduCoursesSchema)
export const EduCourseCollect = model('edu_course_collects', eduCourseCollectsSchema)
export const EduCourseDescription = model('edu_course_descriptions', eduCourseDescriptionsSchema)
export const EduChapter = model('edu_chapters', eduChaptersSchema)
export const EduVideo = model('edu_videos', eduVideosSchema)
export const EduComment = model('edu_comments', eduCommentsSchema)