import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
    const { t } = useTranslation();
    const cases = [
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
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 px-5">
                <h1 className="text-4xl font-bold mt-8">Выберите причину уведомления</h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {cases.map(x => {
                        return <Card key={x.id} className="w-[400px] min-h-[200px] transition-all active:scale-[0.99] active:opacity-85 cursor-pointer hover:scale-[1.02]">
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
        </>
    );
}
