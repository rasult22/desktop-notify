import React, { useRef, useState } from "react";
import ToggleTheme from "@/components/ToggleTheme";

import {Textarea as BaseTextArea} from '@/components/ui/textarea'
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { pb } from "@/lib/pb";
type Case = {
    id: number,
    text: string,
    desc: string
}
export default function HomePage() {
    const { t } = useTranslation();
    const [currentCase, setCase] = useState<Case>()
    const [comment, setComment] = useState('')
    const [formState, setFormState] = useState<'loading' | 'done' | 'initial'>('initial')
    const [modalState, setModalState] = useState<'open' | 'closed'>('closed')
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const cases: Case[] = [
        {
            id:1,
            text: 'Психологическая помощь',
            desc: 'Потеря близких, семейные проблемы, финансовые затруднения, развод и т.д.'
        },
        {
            id:2,
            text: 'Физическое насилие на территории части',
            desc: 'Избиение, применение оружия, пытки, принуждение к физическим наказаниям, нанесение телесных повреждений'
        },
        {
            id:3,
            text: 'Психологическое давление на военнослужащего',
            desc: 'Оскорбления, угрозы, манипуляции, изоляция от сослуживцев, унижение достоинства, лишение отдыха или личного времени, запугивание'
        },
        {
            id:4,
            text: 'Принуждения военнослужащего к выполнению внеуставных задач.',
            desc: 'Выполнение личных поручений, работа за других, выполнение невоенной работы, использование в качестве бесплатной рабочей силы, выполнение незаконных заданий.'
        },
        {
            id:5,
            text: 'Материальное вымогательство среди военнослужащих',
            desc: 'Требование денег, вымогательство личных вещей, принуждение к передаче имущества'
        },
        {
            id:6,
            text: 'Угроза жизни или здоровью военнослужащего',
            desc: 'Избиение, ограничение доступа к мед помощи, угроза убийсва'
        },
        {
            id:7,
            text: 'Угроза жизни или здоровью военнослужащего',
            desc: 'Избиение, ограничение доступа к мед помощи, угроза убийсва'
        },
        {
            id:8,
            text: 'Свой вариант.',
            desc: 'Опишите ситуацию самостоятельно'
        },
    ]
    const onMessage = async () => {
        setFormState('loading')
        await startWebcam()
        const file = await new Promise<File | undefined>((res) => {
            setTimeout(async () => {
                res(await capturePicture())
            }, 500)
        })
        videoRef.current?.pause()
        setTimeout(() => {
            pb.collection('desktop_notify').create({
                text: currentCase?.text,
                desc: currentCase?.desc,
                comment: comment,
                image: file
            })
            setFormState('done')
            setTimeout(() => {
                setFormState('initial')
                setCase(undefined)
                setModalState('closed')
            }, 500)
        }, 500)
    }
     // Start the webcam
     const startWebcam = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
    };

    // Capture a picture and convert it to a file
    const capturePicture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const context = canvas.getContext('2d');
            // Set canvas size to video dimensions
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            // Draw the video frame onto the canvas
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            return new Promise<File>((res) => {
                canvas.toBlob((blob) => {
                    console.log(blob)
                    if (blob) {
                        const file = new File([blob], 'captured-image.png', { type: 'image/png' });
                        console.log(file); // Use or send the file as needed
                        res(file)
                    }
                }, 'image/png');
            })
        }
    };
    
    return (
        <>
            <AlertDialog open={modalState === 'open'}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-[24px] leading-[120%]">Вы хотите сообщить об этом?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[16px]">
                        {currentCase?.text}
                    </AlertDialogDescription>
                    <div className="pt-4">
                        <BaseTextArea value={comment} onChange={(e) => {
                            setComment(e.target.value)
                        }} placeholder="Дополнительная информация (не обязательно)" /> 
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-[16px]" onClick={() => setModalState('closed')}>Отмена</AlertDialogCancel>
                    <AlertDialogAction className="text-[16px]" onClick={onMessage}>
                        {formState === 'done' ? 'Отправлено!' : formState === 'loading' ? 
                            <Loader2 className="animate-spin" />
                        :'Отправить сообщение'
                        }
                        
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="flex flex-col items-center justify-center gap-2 px-5">
                <h1 className="text-4xl font-bold mt-8">Выберите причину уведомления</h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {cases.map(x => {
                        return <Card onClick={() => {
                            setModalState('open')
                            setCase(x)
                        }} key={x.id} className="w-[400px] min-h-[200px] transition-all active:scale-[0.99] active:opacity-85 cursor-pointer hover:scale-[1.02]">
                                <CardHeader>
                                    <CardTitle className="leading-[120%]">
                                        {x.text}
                                    </CardTitle>
                                    <CardDescription>
                                        {x.desc}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                    })}
                </div>
            </div>
            <canvas className="opacity-0" width={512} height={512} ref={canvasRef}></canvas>
            <video className="opacity-0" ref={videoRef}></video>
        </>
    );
}
